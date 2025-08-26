import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bookmark, 
  Zap, 
  ArrowRight, 
  MousePointer,
  Chrome,
  Globe,
  Monitor,
  Download,
  Sparkles
} from "lucide-react";

export function Bookmarklet() {
  const bookmarkletCode = `javascript:(function(){
    var script = document.createElement('script');
    script.src = 'https://unrav.io/bookmarklet.js';
    document.head.appendChild(script);
  })();`;

  const steps = [
    {
      number: "1",
      title: "Drag the Bookmarklet",
      description: "Drag the UNRAV button below to your bookmarks bar",
      icon: MousePointer,
      color: "text-primary"
    },
    {
      number: "2", 
      title: "Visit Any Website",
      description: "Go to any article, blog post, or YouTube video",
      icon: Globe,
      color: "text-secondary"
    },
    {
      number: "3",
      title: "Click UNRAV",
      description: "Click the bookmarklet to instantly transform content",
      icon: Zap,
      color: "text-accent"
    },
    {
      number: "4",
      title: "Choose Format",
      description: "Select summary, mindmap, podcast, or other formats",
      icon: ArrowRight,
      color: "text-primary"
    }
  ];

  const browsers = [
    { name: "Chrome", icon: Chrome, shortcut: "Ctrl+Shift+B" },
    { name: "Firefox", icon: Globe, shortcut: "Ctrl+Shift+B" },
    { name: "Safari", icon: Monitor, shortcut: "⌘+Shift+B" }
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section header */}
        <div className="text-center space-y-6">
          <Badge variant="outline" className="glass border-secondary/30 text-secondary font-semibold px-4 py-2">
            <Bookmark className="w-4 h-4 mr-2" />
            One-Click Access
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-black">
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              Simplify Any Website
            </span>
            <br />
            <span className="text-foreground">Instantly</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Install our bookmarklet for instant access to UNRAV from any webpage. 
            Transform content with a single click, wherever you are on the web.
          </p>
        </div>

        {/* Bookmarklet card */}
        <div className="max-w-2xl mx-auto">
          <Card className="glass border-secondary/20 shadow-glow-yellow">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl flex items-center justify-center gap-3">
                <Zap className="w-8 h-8 text-secondary" />
                UNRAV Bookmarklet
              </CardTitle>
              <CardDescription>
                Drag this button to your bookmarks bar for instant access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <Button
                  variant="warning"
                  size="lg"
                  className="text-xl px-8 py-4 h-auto font-black uppercase"
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', 'UNRAV - Transform Content');
                    e.dataTransfer.setData('text/uri-list', bookmarkletCode);
                  }}
                >
                  <Sparkles className="w-6 h-6 mr-3" />
                  ⚡ UNRAV THIS!
                </Button>
              </div>
              
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>Tip:</strong> Make sure your bookmarks bar is visible
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
                  {browsers.map((browser) => (
                    <div key={browser.name} className="flex items-center gap-1">
                      <browser.icon className="w-4 h-4" />
                      <span>{browser.name}: {browser.shortcut}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How to use steps */}
        <div className="space-y-8">
          <h3 className="text-3xl font-bold text-center">How to Use</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <Card key={index} className="glass border-white/10 hover:shadow-glow transition-all duration-300 text-center">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent p-4 text-white font-black text-2xl flex items-center justify-center">
                    {step.number}
                  </div>
                  <div className="mb-4">
                    <step.icon className={`w-8 h-8 mx-auto ${step.color}`} />
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Alternative installation */}
        <div className="text-center space-y-6">
          <h3 className="text-2xl font-bold">Prefer Manual Installation?</h3>
          <Card className="glass border-white/10 max-w-2xl mx-auto">
            <CardContent className="p-6 space-y-4">
              <p className="text-sm text-muted-foreground">
                Copy this code and create a new bookmark manually:
              </p>
              <div className="bg-muted/50 rounded-lg p-4 text-sm font-mono text-left overflow-x-auto">
                {bookmarkletCode}
              </div>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Copy Code
                </Button>
                <Button variant="outline" size="sm">
                  <Monitor className="w-4 h-4 mr-2" />
                  Browser Extension
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}