import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fileId, transformationType, customPrompt } = await req.json();
    
    console.log('Processing file:', { fileId, transformationType });

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Get file details from database
    const { data: fileData, error: fileError } = await supabase
      .from('file_uploads')
      .select('*')
      .eq('id', fileId)
      .single();

    if (fileError || !fileData) {
      throw new Error('File not found');
    }

    console.log('File data:', fileData);

    // Download file content from storage
    const { data: fileBlob, error: downloadError } = await supabase.storage
      .from('uploads')
      .download(fileData.storage_path);

    if (downloadError || !fileBlob) {
      throw new Error('Failed to download file');
    }

    // Process file based on type
    let extractedContent = '';
    
    if (fileData.file_type.includes('text') || fileData.file_type.includes('json')) {
      extractedContent = await fileBlob.text();
    } else if (fileData.file_type.includes('pdf')) {
      // For PDF files, we'll use the content preview for now
      // In production, you'd use a proper PDF parsing library
      extractedContent = fileData.content_preview || 'PDF content processing not implemented yet';
    } else if (fileData.file_type.includes('word')) {
      // For Word documents, use content preview
      extractedContent = fileData.content_preview || 'Word document content processing not implemented yet';
    } else if (fileData.file_type.includes('audio') || fileData.file_type.includes('video')) {
      // For audio/video files, provide metadata
      extractedContent = `Media file: ${fileData.file_name}\nSize: ${(fileData.file_size / 1024 / 1024).toFixed(2)} MB\nType: ${fileData.file_type}\n\nNote: Audio/video transcription not implemented yet. This would require a transcription service like Whisper API.`;
    } else if (fileData.file_type.includes('image')) {
      // For images, provide basic info
      extractedContent = `Image file: ${fileData.file_name}\nSize: ${(fileData.file_size / 1024 / 1024).toFixed(2)} MB\nType: ${fileData.file_type}\n\nNote: Image analysis not implemented yet. This would require vision AI capabilities.`;
    } else {
      extractedContent = `File: ${fileData.file_name}\nType: ${fileData.file_type}\nSize: ${(fileData.file_size / 1024 / 1024).toFixed(2)} MB\n\nContent extraction not supported for this file type.`;
    }

    // Generate AI transformation using Gemini
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured');
    }

    // Create transformation prompt based on type
    let systemPrompt = '';
    switch (transformationType) {
      case 'summary':
        systemPrompt = 'You are an expert at creating concise, accurate summaries. Analyze the content and provide a clear summary with key points.';
        break;
      case 'mindmap':
        systemPrompt = 'You are an expert at creating visual mind maps. Convert the content into a hierarchical mind map structure using emojis and indentation.';
        break;
      case 'podcast':
        systemPrompt = 'You are an expert podcast scriptwriter. Convert the content into an engaging podcast script with natural dialogue and storytelling.';
        break;
      case 'notes':
        systemPrompt = 'You are an expert at creating study materials. Convert the content into well-organized study notes with key concepts, definitions, and questions.';
        break;
      default:
        systemPrompt = customPrompt || 'Analyze and transform the following content in a helpful way.';
    }

    const prompt = `${systemPrompt}\n\nContent to transform:\n${extractedContent}`;

    console.log('Sending request to Gemini API...');

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('Gemini API error:', errorText);
      throw new Error(`Gemini API error: ${geminiResponse.status}`);
    }

    const geminiData = await geminiResponse.json();
    const transformedContent = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || 'No content generated';

    console.log('Transformation complete');

    // Save transformation to database
    const { data: transformation, error: saveError } = await supabase
      .from('transformations')
      .insert({
        file_upload_id: fileId,
        title: `${transformationType} of ${fileData.file_name}`,
        transformation_type: transformationType,
        original_content: extractedContent.substring(0, 1000), // Limit original content size
        transformed_content: transformedContent
      })
      .select()
      .single();

    if (saveError) {
      console.error('Failed to save transformation:', saveError);
    }

    return new Response(JSON.stringify({
      success: true,
      transformedContent,
      transformationType,
      title: `${transformationType} of ${fileData.file_name}`,
      transformationId: transformation?.id
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in file-processor function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});