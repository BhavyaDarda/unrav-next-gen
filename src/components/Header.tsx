import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Menu, 
  Zap, 
  Crown, 
  MessageSquare,
  ChevronRight 
} from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Features", href: "#features" },
    { label: "Demo", href: "#demo" },
    { label: "Bookmarklet", href: "#bookmarklet" },
    { label: "Pricing", href: "#pricing" },
    { label: "Support", href: "#support" }
  ];

  return (
    <header className="fixed top-0 w-full z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  UNRAV
                </span>
              </h1>
              <p className="text-xs text-muted-foreground leading-none">
                Make Complex Simple Again
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            {/* New badge */}
            <Badge variant="secondary" className="hidden sm:flex animate-pulse-glow">
              <Sparkles className="w-3 h-3 mr-1" />
              v2.0 Live!
            </Badge>

            {/* Discord button */}
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <MessageSquare className="w-4 h-4 mr-2" />
              Discord
            </Button>

            {/* Upgrade button */}
            <Button variant="glow" size="sm" className="hidden sm:flex">
              <Crown className="w-4 h-4 mr-2" />
              Upgrade
            </Button>

            {/* Get Started button */}
            <Button variant="hero" size="sm">
              <span className="hidden sm:inline">Get Started</span>
              <span className="sm:hidden">Start</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 pt-4 border-t border-white/10">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-3 border-t border-white/10">
                <Button variant="ghost" size="sm" className="justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Join Discord
                </Button>
                <Button variant="glow" size="sm" className="justify-start">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Pro
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}