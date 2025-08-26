import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Headphones, 
  FileText, 
  Download, 
  Zap, 
  Globe, 
  BookOpen, 
  MessageSquare,
  BarChart3,
  Share2,
  Clock,
  Sparkles
} from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Summaries",
      description: "Extract key insights from any content with advanced AI that understands context and meaning.",
      badge: "Core Feature",
      color: "text-primary"
    },
    {
      icon: Headphones,
      title: "Podcast Generation",
      description: "Convert articles and documents into engaging podcast-style audio content.",
      badge: "Audio",
      color: "text-secondary"
    },
    {
      icon: BookOpen,
      title: "Interactive Mindmaps",
      description: "Visualize complex information as beautiful, navigable mind maps.",
      badge: "Visual",
      color: "text-accent"
    },
    {
      icon: MessageSquare,
      title: "Chat with Content",
      description: "Ask questions and get instant answers from your transformed content.",
      badge: "AI Chat",
      color: "text-primary"
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Transform content in over 50 languages with automatic translation.",
      badge: "Global",
      color: "text-secondary"
    },
    {
      icon: BarChart3,
      title: "Content Analytics",
      description: "Get detailed insights about reading time, complexity, and key topics.",
      badge: "Analytics",
      color: "text-accent"
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Share transformed content with teams or export in multiple formats.",
      badge: "Collaboration",
      color: "text-primary"
    },
    {
      icon: Clock,
      title: "Real-time Processing",
      description: "Lightning-fast content transformation powered by advanced AI models.",
      badge: "Speed",
      color: "text-secondary"
    },
    {
      icon: Download,
      title: "Multiple Export Formats",
      description: "Export as PDF, DOCX, MP3, or interactive web formats.",
      badge: "Export",
      color: "text-accent"
    }
  ];

  const transformationModes = [
    {
      title: "Summary Mode",
      description: "Condense lengthy articles into digestible key points",
      icon: FileText,
      gradient: "from-primary to-accent"
    },
    {
      title: "Study Mode", 
      description: "Create structured notes perfect for learning and revision",
      icon: BookOpen,
      gradient: "from-accent to-secondary"
    },
    {
      title: "Audio Mode",
      description: "Listen to content on-the-go with natural AI narration",
      icon: Headphones,
      gradient: "from-secondary to-primary"
    },
    {
      title: "Visual Mode",
      description: "Transform complex concepts into clear visual representations",
      icon: Brain,
      gradient: "from-primary to-secondary"
    }
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section header */}
        <div className="text-center space-y-6">
          <Badge variant="outline" className="glass border-primary/30 text-primary font-semibold px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Powerful Features
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-black">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Everything You Need
            </span>
            <br />
            <span className="text-foreground">To Simplify Content</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our advanced AI technology transforms how you consume and interact with digital content,
            making complex information accessible and actionable.
          </p>
        </div>

        {/* Transformation modes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {transformationModes.map((mode, index) => (
            <Card key={index} className="glass border-white/10 hover:shadow-glow transition-all duration-300 group cursor-pointer">
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${mode.gradient} p-4 group-hover:scale-110 transition-transform duration-300`}>
                  <mode.icon className="w-full h-full text-white" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {mode.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center leading-relaxed">
                  {mode.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="glass border-white/10 hover:shadow-glow transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br from-muted to-muted/50 group-hover:shadow-glow transition-all duration-300`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats section */}
        <div className="glass rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-black bg-gradient-primary bg-clip-text text-transparent">
                10M+
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                Content Pieces Transformed
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-black bg-gradient-secondary bg-clip-text text-transparent">
                50+
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                Languages Supported
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-black bg-gradient-primary bg-clip-text text-transparent">
                95%
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                Accuracy Rate
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-black bg-gradient-secondary bg-clip-text text-transparent">
                2s
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                Average Processing Time
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}