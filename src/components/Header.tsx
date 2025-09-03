import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Menu, Zap, Crown, MessageSquare, ChevronRight } from "lucide-react";
import { useState } from "react";
import { TransformationHistory } from "@/components/TransformationHistory";
export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [{
    label: "Features",
    href: "#features"
  }, {
    label: "Demo",
    href: "#demo"
  }, {
    label: "Bookmarklet",
    href: "#bookmarklet"
  }, {
    label: "Pricing",
    href: "#pricing"
  }, {
    label: "Support",
    href: "#support"
  }];
  return <header className="fixed top-0 w-full z-50 bg-background brutal-border-thick border-t-0 border-l-0 border-r-0 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Brutal Logo */}
          <div className="flex items-center gap-4">
            <div className="bg-primary brutal-border brutal-shadow p-3 transform -rotate-12">
              <Zap className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tighter uppercase">
                MindLoom AI
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navItems.map(item => <a key={item.label} href={item.href} className="text-xs xl:text-sm font-black uppercase text-foreground hover:text-primary transition-colors brutal-hover">
                {item.label}
              </a>)}
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* History button */}
            <div className="hidden sm:block">
              <TransformationHistory />
            </div>


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
            <Button variant="outline" size="sm" className="lg:hidden font-black" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && <div className="lg:hidden mt-4 pt-4 brutal-border border-l-0 border-r-0 border-b-0">
            <div className="flex flex-col space-y-4">
              {navItems.map(item => <a key={item.label} href={item.href} className="text-sm font-black uppercase text-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  {item.label}
                </a>)}
              <div className="flex flex-col gap-3 pt-4 brutal-border border-l-0 border-r-0 border-b-0">
                <div className="sm:hidden">
                  <TransformationHistory />
                </div>
                <Button variant="accent" size="sm" className="justify-start">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Pro
                </Button>
              </div>
            </div>
          </div>}
      </div>
    </header>;
}