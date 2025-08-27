import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  Volume2, 
  Download, 
  Share2, 
  Eye,
  FileText,
  Headphones,
  Brain,
  BookOpen,
  Sparkles,
  Clock,
  BarChart3
} from "lucide-react";
import { useState } from "react";

export function Demo() {
  const [currentDemo, setCurrentDemo] = useState("summary");
  const [isPlaying, setIsPlaying] = useState(false);

  const demoContent = {
    summary: {
      title: "AI Summary Example",
      type: "Article Summary",
      duration: "30 sec read",
      content: `
        **Key Points:**
        • Advanced AI models can now understand context and nuance in human language
        • Natural language processing has improved dramatically with transformer architectures
        • Applications include content summarization, translation, and creative writing
        • Ethical considerations around AI bias and misinformation remain important challenges
        
        **Main Insight:**
        The rapid advancement in AI language models represents a paradigm shift in how we interact with and process information, requiring both excitement and caution as we integrate these tools into daily workflows.
      `,
      icon: FileText,
      color: "text-primary"
    },
    mindmap: {
      title: "Interactive Mindmap",
      type: "Visual Structure", 
      duration: "Interactive",
      content: `
        🧠 **AI Language Models**
        ├── 📚 **Core Technologies**
        │   ├── Transformer Architecture
        │   ├── Attention Mechanisms
        │   └── Neural Networks
        ├── 🎯 **Applications**
        │   ├── Content Summarization
        │   ├── Language Translation
        │   ├── Creative Writing
        │   └── Code Generation
        ├── ⚡ **Benefits**
        │   ├── Increased Productivity
        │   ├── Better Accessibility
        │   └── Enhanced Creativity
        └── ⚠️ **Challenges**
            ├── Bias & Fairness
            ├── Misinformation
            └── Ethical Use
      `,
      icon: Brain,
      color: "text-accent"
    },
    podcast: {
      title: "AI-Generated Podcast",
      type: "Audio Content",
      duration: "8 min listen",
      content: `
        🎧 **Podcast Transcript Preview:**
        
        "Welcome to Tech Insights, where we break down complex topics into digestible conversations. Today we're exploring the fascinating world of AI language models and their impact on how we process information.
        
        These advanced systems have revolutionized our ability to understand and generate human-like text. What's particularly exciting is how they've moved beyond simple pattern matching to actually understanding context and nuance..."
        
        **Audio Features:**
        • Natural speech synthesis
        • Multiple voice options
        • Adjustable playback speed
        • Chapter navigation
        • Offline listening
      `,
      icon: Headphones,
      color: "text-secondary"
    },
    notes: {
      title: "Study Notes",
      type: "Learning Material",
      duration: "Study guide",
      content: `
        📖 **Study Guide: AI Language Models**
        
        **Definition:**
        AI language models are neural networks trained to understand and generate human language by learning patterns from vast text datasets.
        
        **Key Concepts to Remember:**
        1. **Transformer Architecture** - The foundation of modern language models
        2. **Attention Mechanisms** - How models focus on relevant information
        3. **Fine-tuning** - Adapting models for specific tasks
        
        **Study Questions:**
        • What makes transformer architecture different from previous approaches?
        • How do attention mechanisms improve model performance?
        • What are the main ethical considerations when deploying AI language models?
        
        **Further Reading:**
        • "Attention Is All You Need" - Original transformer paper
        • AI Ethics guidelines from major tech companies
      `,
      icon: BookOpen,
      color: "text-primary"
    }
  };

  const demoTypes = [
    { id: "summary", label: "Summary", icon: FileText },
    { id: "mindmap", label: "Mindmap", icon: Brain },
    { id: "podcast", label: "Podcast", icon: Headphones },
    { id: "notes", label: "Study Notes", icon: BookOpen }
  ];

  const currentContent = demoContent[currentDemo as keyof typeof demoContent];

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section header */}
        <div className="text-center space-y-6">
          <Badge variant="outline" className="glass border-accent/30 text-accent font-semibold px-4 py-2">
            <Play className="w-4 h-4 mr-2" />
            Live Demo
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-black">
            <span className="text-foreground">See MindLoom AI</span>
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              In Action
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience how MindLoom AI transforms complex content into your preferred format. 
            Try our interactive demo with real AI-generated examples.
          </p>
        </div>

        {/* Demo interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Demo type selector */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Choose Transformation</h3>
            {demoTypes.map((type) => (
              <Button
                key={type.id}
                variant={currentDemo === type.id ? "brutal" : "ghost"}
                className="w-full justify-start text-left h-auto p-4 font-black uppercase"
                onClick={() => setCurrentDemo(type.id)}
              >
                <type.icon className="w-5 h-5 mr-3" />
                <div>
                  <div className="font-black">{type.label}</div>
                  <div className="text-sm opacity-70">
                    {demoContent[type.id as keyof typeof demoContent].type}
                  </div>
                </div>
              </Button>
            ))}
          </div>

          {/* Demo content */}
          <div className="lg:col-span-2">
            <Card className="glass border-white/10 h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br from-muted to-muted/50`}>
                      <currentContent.icon className={`w-6 h-6 ${currentContent.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{currentContent.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {currentContent.duration}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {currentDemo === "podcast" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {currentDemo === "podcast" && (
                  <div className="glass rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="sm">
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <div className="flex-1 bg-muted/50 rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-primary h-full w-1/3 rounded-full" />
                      </div>
                      <Volume2 className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>2:34</span>
                      <span>8:12</span>
                    </div>
                  </div>
                )}
                
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-line text-sm leading-relaxed">
                    {currentContent.content}
                  </div>
                </div>

                {/* Demo stats */}
                <div className="glass rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">95%</div>
                      <div className="text-xs text-muted-foreground">Accuracy</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-secondary">2.3s</div>
                      <div className="text-xs text-muted-foreground">Process Time</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-accent">847</div>
                      <div className="text-xs text-muted-foreground">Words</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Try demo CTA */}
        <div className="text-center space-y-6">
          <h3 className="text-2xl font-bold">Ready to Transform Your Content?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="brutal" size="lg" className="text-lg px-8 font-black">
              <Sparkles className="w-5 h-5 mr-2" />
              START FREE TRIAL
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 font-black">
              <Eye className="w-5 h-5 mr-2" />
              WATCH FULL DEMO
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}