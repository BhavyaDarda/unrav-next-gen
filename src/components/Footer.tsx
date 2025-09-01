import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Zap, 
  Twitter, 
  Github, 
  MessageSquare, 
  Mail,
  Heart,
  ExternalLink,
  Sparkles
} from "lucide-react";

export function Footer() {
  const footerSections = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Demo", href: "#demo" },
        { label: "Pricing", href: "#pricing" },
        { label: "API Docs", href: "#api" },
        { label: "Changelog", href: "#changelog" }
      ]
    },
    {
      title: "Tools",
      links: [
        { label: "Bookmarklet", href: "#bookmarklet" },
        { label: "Browser Extension", href: "#extension" },
        { label: "Mobile App", href: "#mobile" },
        { label: "Desktop App", href: "#desktop" },
        { label: "CLI Tool", href: "#cli" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "#blog" },
        { label: "Help Center", href: "#help" },
        { label: "Community", href: "#community" },
        { label: "Tutorials", href: "#tutorials" },
        { label: "Status", href: "#status" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#about" },
        { label: "Careers", href: "#careers" },
        { label: "Privacy", href: "#privacy" },
        { label: "Terms", href: "#terms" },
        { label: "Contact", href: "#contact" }
      ]
    }
  ];

  return (
    <footer className="bg-gradient-to-t from-muted/50 to-background border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Newsletter section */}
        <div className="bg-background brutal-border brutal-shadow p-8 md:p-12 mb-16">
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <h3 className="text-3xl font-black">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Stay Updated
                </span>
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get the latest updates on new features, AI improvements, and productivity tips 
                delivered straight to your inbox.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="ENTER YOUR EMAIL"
                className="flex-1 bg-background brutal-border font-bold uppercase placeholder:text-muted-foreground text-sm sm:text-base"
              />
              <Button variant="brutal" className="px-4 xs:px-6 font-black text-sm sm:text-base">
                <Sparkles className="w-4 h-4 mr-1 xs:mr-2" />
                <span className="hidden xs:inline">SUBSCRIBE</span>
                <span className="xs:hidden">SUB</span>
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand section */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-black">
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    MindLoom AI
                  </span>
                </h2>
                <p className="text-xs text-muted-foreground">
                  Weave Knowledge Into Understanding
                </p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              Transform any web content into your perfect view with AI-powered 
              summarization, mindmaps, podcasts, and more.
            </p>
            
            <div className="flex gap-3">
              <Button variant="ghost" size="sm">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MessageSquare className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Footer sections */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                    >
                      {link.label}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground text-center md:text-left">
              <p className="flex items-center gap-1">
                Made with <Heart className="w-4 h-4 text-red-500" /> by the MindLoom AI team
              </p>
              <p className="mt-1">
                © 2024 MindLoom AI. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#cookies" className="hover:text-foreground transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}