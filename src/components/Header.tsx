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
    <header className="fixed top-0 w-full z-50 bg-background brutal-border-thick border-t-0 border-l-0 border-r-0">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Brutal Logo */}
          <div className="flex items-center gap-4">
            <div className="bg-primary brutal-border brutal-shadow p-3 transform -rotate-12">
              <Zap className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter uppercase">
                UNRAV
              </h1>
              <p className="text-xs font-black uppercase text-muted-foreground leading-none">
                MAKE COMPLEX SIMPLE AGAIN
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-black uppercase text-foreground hover:text-primary transition-colors brutal-hover"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            {/* New badge */}
            <div className="hidden sm:flex bg-secondary text-secondary-foreground brutal-border px-3 py-1 text-xs font-black uppercase animate-brutal-shake">
              <Sparkles className="w-3 h-3 mr-1" />
              v2.0!
            </div>

            {/* Discord button */}
            <Button variant="ghost" size="sm" className="hidden sm:flex font-black uppercase">
              <MessageSquare className="w-4 h-4 mr-2" />
              Discord
            </Button>

            {/* Upgrade button */}
            <Button variant="accent" size="sm" className="hidden sm:flex">
              <Crown className="w-4 h-4 mr-2" />
              Upgrade
            </Button>

            {/* Get Started button */}
            <Button variant="brutal" size="sm" className="font-black">
              <span className="hidden sm:inline">GET STARTED</span>
              <span className="sm:hidden">START</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden font-black"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 brutal-border border-l-0 border-r-0 border-b-0">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-black uppercase text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4 brutal-border border-l-0 border-r-0 border-b-0">
                <Button variant="ghost" size="sm" className="justify-start font-black uppercase">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Join Discord
                </Button>
                <Button variant="accent" size="sm" className="justify-start">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Pro
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}