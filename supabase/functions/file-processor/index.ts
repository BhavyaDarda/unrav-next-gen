import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { files, transformationType, customInstructions } = await req.json();
    
    if (!files || files.length === 0) {
      throw new Error('No files provided');
    }

    if (!GEMINI_API_KEY) {
      throw new Error('Gemini API key not configured');
    }

    console.log(`Processing ${files.length} files with transformation: ${transformationType}`);

    const results = [];

    for (const fileData of files) {
      const { fileName, fileType, content } = fileData;
      
      let prompt = '';
      const baseInstructions = customInstructions || '';

      // Create specific prompts based on file type and transformation
      switch (transformationType) {
        case 'summary':
          if (fileType.startsWith('audio/')) {
            prompt = `Please transcribe and summarize this audio file content: ${content}. ${baseInstructions}`;
          } else if (fileType.startsWith('video/')) {
            prompt = `Please analyze and summarize this video file: ${content}. ${baseInstructions}`;
          } else {
            prompt = `Please provide a comprehensive summary of this document: ${content}. ${baseInstructions}`;
          }
          break;
        
        case 'mindmap':
          prompt = `Convert this content into a detailed mindmap structure using markdown format with hierarchical bullet points: ${content}. ${baseInstructions}`;
          break;
        
        case 'podcast':
          if (fileType.startsWith('audio/')) {
            prompt = `Transcribe this audio and format it as a podcast script with timestamps and speaker notes: ${content}. ${baseInstructions}`;
          } else {
            prompt = `Convert this content into an engaging podcast script format: ${content}. ${baseInstructions}`;
          }
          break;
        
        case 'legal':
          prompt = `Analyze this document for legal implications, key terms, and potential risks. Provide a structured legal analysis: ${content}. ${baseInstructions}`;
          break;
        
        case 'extract':
          if (fileType.includes('pdf') || fileType.includes('word')) {
            prompt = `Extract and structure all key information from this document: ${content}. ${baseInstructions}`;
          } else if (fileType === 'application/json') {
            prompt = `Parse and explain this JSON data structure: ${content}. ${baseInstructions}`;
          } else {
            prompt = `Extract key information and data from this file: ${content}. ${baseInstructions}`;
          }
          break;
        
        default:
          prompt = `Process this file content according to these instructions: ${baseInstructions || 'Analyze and improve the content'}: ${content}`;
      }

      // Call Gemini API
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
          }
        }),
      });

      if (!response.ok) {
        console.error(`Gemini API error for ${fileName}:`, response.statusText);
        results.push({
          fileName,
          success: false,
          error: `API error: ${response.statusText}`,
        });
        continue;
      }

      const data = await response.json();
      const transformedContent = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No content generated';

      results.push({
        fileName,
        fileType,
        success: true,
        originalContent: content,
        transformedContent,
        transformationType,
      });

      console.log(`Successfully processed: ${fileName}`);
    }

    return new Response(JSON.stringify({
      success: true,
      results,
      totalProcessed: results.length,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in file-processor function:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});