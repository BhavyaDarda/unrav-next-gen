import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Globe, FileText, Upload, Loader2, Copy, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FileUpload } from "./FileUpload";
import { useEnhancedFileUpload } from "@/hooks/useEnhancedFileUpload";
import { useAuth } from "@/hooks/useAuth";

export function Demo() {
  const [activeTab, setActiveTab] = useState("url");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [transformationType, setTransformationType] = useState("summary");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const { uploadedFiles, uploadFiles, removeFile, clearFiles, isUploading } = useEnhancedFileUpload();

  const transformationTypes = [
    { id: "summary", label: "Summary", icon: "📝" },
    { id: "mindmap", label: "Mind Map", icon: "🧠" },
    { id: "podcast", label: "Podcast Script", icon: "🎙️" },
    { id: "legal", label: "Legal Analysis", icon: "⚖️" },
    { id: "extract", label: "Data Extraction", icon: "🔍" },
  ];

  const handleTransform = async () => {
    if (!url && !text && uploadedFiles.length === 0) {
      toast({
        title: "Input Required",
        description: "Please provide a URL, text, or upload files to transform.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult("");

    try {
      let content = text;
      let title = "Direct Input";

      // Handle different input types
      if (activeTab === "url" && url) {
        // Scrape URL content
        const { data: scrapeData, error: scrapeError } = await supabase.functions.invoke('content-scraper', {
          body: { url }
        });

        if (scrapeError) throw scrapeError;
        if (!scrapeData.success) throw new Error(scrapeData.error);

        content = scrapeData.content;
        title = scrapeData.title;

        // Transform the content
        const { data: transformData, error: transformError } = await supabase.functions.invoke('content-transformer', {
          body: { 
            content, 
            transformationType,
            title 
          }
        });

        if (transformError) throw transformError;
        if (!transformData.success) throw new Error(transformData.error);

        setResult(transformData.transformedContent);
        
      } else if (activeTab === "file" && uploadedFiles.length > 0) {
        // Process uploaded files
        const files = uploadedFiles.map(f => ({
          fileName: f.file.name,
          fileType: f.file.type,
          content: f.content,
        }));

        const { data: processData, error: processError } = await supabase.functions.invoke('file-processor', {
          body: { 
            files,
            transformationType,
            customInstructions: text // Use text field as custom instructions for files
          }
        });

        if (processError) throw processError;
        if (!processData.success) throw new Error(processData.error);

        // Format results from multiple files
        const formattedResults = processData.results.map((result: any) => 
          `## ${result.fileName}\n\n${result.transformedContent}`
        ).join('\n\n---\n\n');

        setResult(formattedResults);
        
      } else if (activeTab === "text" && text) {
        // Transform direct text input
        const { data: transformData, error: transformError } = await supabase.functions.invoke('content-transformer', {
          body: { 
            content: text, 
            transformationType,
            title: "Direct Text Input"
          }
        });

        if (transformError) throw transformError;
        if (!transformData.success) throw new Error(transformData.error);

        setResult(transformData.transformedContent);
      }

      // Save to transformation history if user is logged in
      if (user && result) {
        await supabase.from('transformations').insert({
          user_id: user.id,
          title: title,
          transformation_type: transformationType,
          original_content: content || text || `${uploadedFiles.length} files`,
          transformed_content: result,
        });
      }
      
      toast({
        title: "Transformation Complete",
        description: "Your content has been successfully transformed!",
      });

    } catch (error) {
      console.error('Transformation error:', error);
      toast({
        title: "Transformation Failed", 
        description: error.message || "An error occurred during transformation.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      toast({
        title: "Copied!",
        description: "Result copied to clipboard.",
      });
    }
  };

  const downloadResult = () => {
    if (result) {
      const blob = new Blob([result], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transformed-content-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <section id="demo" className="py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Try DocBash AI</h2>
          <p className="text-muted-foreground">
            Transform your content with AI-powered tools. Upload files, paste URLs, or enter text directly.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Content Transformation</CardTitle>
            <CardDescription>
              Choose your input method and transformation type
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Transformation Type Selector */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Transformation Type</label>
              <div className="flex flex-wrap gap-2">
                {transformationTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={transformationType === type.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTransformationType(type.id)}
                  >
                    <span className="mr-2">{type.icon}</span>
                    {type.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input Method Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="url" className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  URL
                </TabsTrigger>
                <TabsTrigger value="text" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Text
                </TabsTrigger>
                <TabsTrigger value="file" className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Files
                </TabsTrigger>
              </TabsList>

              <TabsContent value="url" className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="url-input" className="text-sm font-medium">
                    Website URL
                  </label>
                  <input
                    id="url-input"
                    type="url"
                    placeholder="https://example.com/article"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                  />
                </div>
              </TabsContent>

              <TabsContent value="text" className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="text-input" className="text-sm font-medium">
                    Text Content
                  </label>
                  <Textarea
                    id="text-input"
                    placeholder="Paste your text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="min-h-[200px]"
                  />
                </div>
              </TabsContent>

              <TabsContent value="file" className="space-y-4">
                <FileUpload 
                  onFilesUploaded={() => {}} 
                  maxFiles={10}
                  className="min-h-[200px]"
                />
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Uploaded Files ({uploadedFiles.length}):</p>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {uploadedFiles.map((file, index) => (
                        <div key={file.id} className="flex items-center justify-between p-2 bg-muted rounded text-sm">
                          <span>{file.file.name}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeFile(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Textarea
                      placeholder="Add custom instructions for processing these files..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                )}
              </TabsContent>
            </Tabs>

            {/* Transform Button */}
            <Button 
              onClick={handleTransform} 
              disabled={isLoading || (!url && !text && uploadedFiles.length === 0)} 
              className="w-full"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Transforming..." : "Transform Content"}
            </Button>

            {/* Results */}
            {result && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Transformed Content</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadResult}>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
                <div className="bg-muted p-4 rounded-md max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm">{result}</pre>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}