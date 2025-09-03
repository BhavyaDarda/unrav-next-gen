import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Crown, Menu, X, LogIn, LogOut, User } from "lucide-react";
import { TransformationHistory } from "./TransformationHistory";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    closeMenu();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold">D</span>
          </div>
          <span className="font-bold text-xl">DocBash</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </a>
          <a href="#demo" className="text-sm font-medium hover:text-primary transition-colors">
            Demo
          </a>
          <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
            Pricing
          </a>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* History button */}
          <div className="hidden sm:block">
            <TransformationHistory />
          </div>

          {/* Auth buttons */}
          {user ? (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4 mr-2" />
                {user.email}
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Button variant="accent" size="sm" onClick={() => navigate('/auth')}>
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          )}

          {/* Upgrade button */}
          <Button variant="accent" size="sm">
            <Crown className="w-4 h-4 mr-2" />
            Upgrade to Pro
          </Button>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="outline"
          size="sm"
          className="md:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <nav className="space-y-2">
              <a
                href="#features"
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                onClick={closeMenu}
              >
                Features
              </a>
              <a
                href="#demo"
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                onClick={closeMenu}
              >
                Demo
              </a>
              <a
                href="#pricing"
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                onClick={closeMenu}
              >
                Pricing
              </a>
            </nav>

            <div className="space-y-2 pt-4 border-t">
              <div className="sm:hidden">
                <TransformationHistory />
              </div>
              
              {/* Mobile Auth buttons */}
              {user ? (
                <>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <User className="w-4 h-4 mr-2" />
                    {user.email}
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button variant="accent" size="sm" className="w-full justify-start" onClick={() => { navigate('/auth'); closeMenu(); }}>
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              )}
              
              <Button variant="accent" size="sm" className="w-full justify-start">
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Pro
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}