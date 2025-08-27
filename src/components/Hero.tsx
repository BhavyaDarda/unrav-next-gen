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
      id: "legal",
      label: "Legal Analysis",
      icon: Download,
      description: "Demystify legal documents",
      color: "text-destructive"
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
    <section className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6">
      {/* Brutal background pattern */}
      <div className="absolute inset-0 brutal-pattern" />
      <div className="absolute inset-0 brutal-dots" />

      {/* Floating brutal elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary brutal-border brutal-shadow rotate-12 animate-brutal-bounce" />
      <div className="absolute top-40 right-20 w-16 h-16 bg-secondary brutal-border brutal-shadow -rotate-12 animate-brutal-shake" />
      <div className="absolute bottom-40 left-20 w-24 h-12 bg-accent brutal-border brutal-shadow rotate-45" />

      <div className="relative z-10 max-w-6xl mx-auto text-center space-y-12">
        {/* Brutal headline */}
        <div className="space-y-8">
          <div className="bg-primary text-primary-foreground brutal-border brutal-shadow-lg px-8 py-4 inline-block transform -rotate-2">
            <div className="flex items-center gap-3 text-lg font-black uppercase">
              <Sparkles className="w-6 h-6" />
              AI-POWERED CONTENT DESTROYER
            </div>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none">
            <div className="bg-foreground text-background brutal-border brutal-shadow-lg px-8 py-4 mb-4 transform rotate-1">
              MAKE
            </div>
            <div className="bg-primary text-primary-foreground brutal-border brutal-shadow-lg px-8 py-4 mb-4 transform -rotate-1">
              COMPLEX
            </div>
            <div className="bg-secondary text-secondary-foreground brutal-border brutal-shadow-lg px-8 py-4 mb-4 transform rotate-2">
              SIMPLE
            </div>
            <div className="bg-accent text-accent-foreground brutal-border brutal-shadow-lg px-8 py-4 transform -rotate-1">
              AGAIN.
            </div>
          </h1>

          <div className="bg-muted brutal-border brutal-shadow px-8 py-6 max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl font-bold uppercase leading-tight">
              TRANSFORM ANY WEB CONTENT INTO YOUR PERFECT VIEW. CONVERT ARTICLES, PAPERS, 
              DOCUMENTS, AND YOUTUBE VIDEOS INTO SUMMARIES, MINDMAPS, PODCASTS, AND MORE.
            </p>
          </div>
        </div>

        {/* Brutal content transformation interface */}
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-background brutal-border-thick brutal-shadow-lg">
            <div className="bg-foreground text-background p-4">
              <h2 className="text-2xl font-black uppercase tracking-wider">CONTENT DESTROYER 3000</h2>
            </div>
            
            <Tabs defaultValue="url" className="w-full">
              <div className="p-6 space-y-6">
                <TabsList className="bg-muted brutal-border w-full h-auto p-2 grid grid-cols-3">
                  <TabsTrigger value="url" className="brutal-border bg-primary text-primary-foreground font-black uppercase data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
                    <Link2 className="w-4 h-4 mr-2" />
                    URL
                  </TabsTrigger>
                  <TabsTrigger value="text" className="brutal-border bg-primary text-primary-foreground font-black uppercase data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
                    <FileText className="w-4 h-4 mr-2" />
                    TEXT
                  </TabsTrigger>
                  <TabsTrigger value="video" className="brutal-border bg-primary text-primary-foreground font-black uppercase data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
                    <PlayCircle className="w-4 h-4 mr-2" />
                    VIDEO
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="url" className="space-y-6">
                  <div className="space-y-6">
                    <div className="bg-secondary text-secondary-foreground brutal-border p-4 transform -rotate-1">
                      <h3 className="text-xl font-black uppercase">PASTE ANY URL TO DESTROY</h3>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex-1 relative">
                        <Input
                          type="url"
                          placeholder="https://example.com/article or https://youtube.com/watch?v=..."
                          value={inputUrl}
                          onChange={(e) => setInputUrl(e.target.value)}
                          className="h-16 text-lg bg-background brutal-border font-bold pl-16"
                        />
                        <Link2 className="absolute left-6 top-1/2 transform -translate-y-1/2 text-foreground w-6 h-6" />
                      </div>
                      <Button 
                        variant="warning" 
                        size="lg" 
                        onClick={handleTransform}
                        disabled={!inputUrl.trim() || isTransforming}
                        className="h-16 px-8 text-lg"
                      >
                        {isTransforming ? (
                          <>
                            <Zap className="w-6 h-6 mr-2 animate-brutal-shake" />
                            DESTROYING...
                          </>
                        ) : (
                          <>
                            <Zap className="w-6 h-6 mr-2" />
                            DESTROY!
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="text" className="space-y-6">
                  <div className="bg-muted brutal-border p-6">
                    <h3 className="text-xl font-black uppercase mb-6">PASTE OR TYPE YOUR CONTENT</h3>
                    <textarea
                      placeholder="PASTE YOUR ARTICLE, RESEARCH PAPER, OR ANY TEXT CONTENT HERE..."
                      className="w-full h-40 p-4 bg-background brutal-border font-bold resize-none text-sm uppercase placeholder:text-muted-foreground"
                    />
                    <Button variant="brutal" size="lg" className="w-full mt-4">
                      <Zap className="w-5 h-5 mr-2" />
                      DESTROY TEXT
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="video" className="space-y-6">
                  <div className="bg-muted brutal-border p-6">
                    <h3 className="text-xl font-black uppercase mb-6">UPLOAD OR LINK TO VIDEO CONTENT</h3>
                    <div className="brutal-border bg-background p-8 text-center">
                      <PlayCircle className="w-12 h-12 mx-auto mb-4 text-foreground" />
                      <p className="text-foreground mb-4 font-bold uppercase">DROP VIDEO FILES HERE OR PASTE YOUTUBE/VIMEO LINKS</p>
                      <Button variant="outline" size="lg" className="font-black">
                        CHOOSE FILES
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>

        {/* Brutal transformation options */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {transformationTypes.map((type) => (
            <div key={type.id} className="bg-background brutal-border brutal-shadow hover:brutal-shadow-lg transition-all duration-100 p-6 text-center cursor-pointer group hover:-translate-y-2">
              <div className="bg-muted brutal-border p-4 mb-4 mx-auto w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <type.icon className="w-8 h-8" />
              </div>
              <h4 className="font-black uppercase mb-2 text-sm">{type.label}</h4>
              <p className="text-xs font-bold uppercase text-muted-foreground">{type.description}</p>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button variant="brutal" size="lg" className="text-xl px-12 py-6 h-auto">
            <Sparkles className="w-6 h-6 mr-3" />
            START DESTROYING
          </Button>
          <Button variant="warning" size="lg" className="text-xl px-12 py-6 h-auto">
            INSTALL BOOKMARKLET
          </Button>
        </div>
      </div>
    </section>
  );
}