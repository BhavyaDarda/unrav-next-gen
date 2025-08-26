import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Link2, FileText, PlayCircle, Zap, Brain, Headphones, Download } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

export function Hero() {
  const [inputUrl, setInputUrl] = useState("");
  const [isTransforming, setIsTransforming] = useState(false);

  const transformationTypes = [
    {
      id: "summary",
      label: "Summary",
      icon: FileText,
      description: "Get concise key points",
      color: "text-primary"
    },
    {
      id: "mindmap",
      label: "Mindmap",
      icon: Brain,
      description: "Visual knowledge structure",
      color: "text-accent"
    },
    {
      id: "podcast",
      label: "Podcast",
      icon: Headphones,
      description: "AI-generated audio content",
      color: "text-secondary"
    },
    {
      id: "notes",
      label: "Study Notes",
      icon: Download,
      description: "Structured learning material",
      color: "text-primary"
    }
  ];

  const handleTransform = async () => {
    if (!inputUrl.trim()) return;
    
    setIsTransforming(true);
    // Simulate API call
    setTimeout(() => {
      setIsTransforming(false);
    }, 2000);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-primary rounded-full opacity-20 animate-float" />
      <div className="absolute top-40 right-20 w-12 h-12 bg-gradient-secondary rounded-full opacity-30 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-20 w-16 h-16 bg-gradient-primary rounded-full opacity-25 animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-12">
        {/* Main headline */}
        <div className="space-y-6">
          <Badge variant="outline" className="glass border-primary/30 text-primary font-semibold px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Content Transformation
          </Badge>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tight">
            <span className="bg-gradient-hero bg-clip-text text-transparent animate-gradient">
              MAKE
            </span>
            <br />
            <span className="text-foreground">COMPLEX</span>
            <br />
            <span className="bg-gradient-secondary bg-clip-text text-transparent animate-gradient">
              SIMPLE
            </span>
            <br />
            <span className="text-foreground">AGAIN.</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transform any web content into your perfect view. Convert articles, papers, 
            documents, and YouTube videos into summaries, mindmaps, podcasts, and more.
          </p>
        </div>

        {/* Content transformation interface */}
        <div className="max-w-4xl mx-auto space-y-8">
          <Tabs defaultValue="url" className="w-full">
            <TabsList className="glass border-white/10 p-1">
              <TabsTrigger value="url" className="flex items-center gap-2">
                <Link2 className="w-4 h-4" />
                URL
              </TabsTrigger>
              <TabsTrigger value="text" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                TEXT
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center gap-2">
                <PlayCircle className="w-4 h-4" />
                VIDEO
              </TabsTrigger>
            </TabsList>

            <TabsContent value="url" className="space-y-6">
              <div className="glass rounded-2xl p-8 space-y-6">
                <h3 className="text-2xl font-bold text-center">Paste any URL to transform</h3>
                
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Input
                      type="url"
                      placeholder="https://example.com/article or https://youtube.com/watch?v=..."
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      className="h-14 text-lg bg-muted/50 border-border/50 rounded-xl pl-12"
                    />
                    <Link2 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  </div>
                  <Button 
                    variant="hero" 
                    size="lg" 
                    onClick={handleTransform}
                    disabled={!inputUrl.trim() || isTransforming}
                    className="h-14 px-8 text-lg"
                  >
                    {isTransforming ? (
                      <>
                        <Zap className="w-5 h-5 mr-2 animate-spin" />
                        Transforming...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 mr-2" />
                        Transform Content
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground text-center">
                  We'll automatically extract content from web pages and YouTube videos
                </p>
              </div>
            </TabsContent>

            <TabsContent value="text" className="space-y-6">
              <div className="glass rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-center mb-6">Paste or type your content</h3>
                <textarea
                  placeholder="Paste your article, research paper, or any text content here..."
                  className="w-full h-40 p-4 bg-muted/50 border border-border/50 rounded-xl resize-none"
                />
                <Button variant="hero" size="lg" className="w-full mt-4">
                  <Zap className="w-5 h-5 mr-2" />
                  Transform Text
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="video" className="space-y-6">
              <div className="glass rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-center mb-6">Upload or link to video content</h3>
                <div className="border-2 border-dashed border-border/50 rounded-xl p-8 text-center">
                  <PlayCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">Drop video files here or paste YouTube/Vimeo links</p>
                  <Button variant="outline" size="lg">
                    Choose Files
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Transformation options */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {transformationTypes.map((type) => (
              <div key={type.id} className="glass rounded-xl p-6 text-center hover:shadow-glow transition-all duration-300 cursor-pointer group">
                <type.icon className={`w-8 h-8 mx-auto mb-3 ${type.color} group-hover:scale-110 transition-transform`} />
                <h4 className="font-semibold mb-2">{type.label}</h4>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="glow" size="lg" className="text-lg px-8">
            <Sparkles className="w-5 h-5 mr-2" />
            Try Free Demo
          </Button>
          <Button variant="glass" size="lg" className="text-lg px-8">
            Install Bookmarklet
          </Button>
        </div>
      </div>
    </section>
  );
}