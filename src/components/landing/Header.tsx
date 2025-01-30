import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Code, Menu, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export const Header = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleAuthenticatedNavigation = async (destination: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session?.user) {
      navigate(destination);
    } else {
      toast({
        title: "Authentication Required",
        description: "Please sign in or create an account to continue.",
      });
      navigate('/login');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm border-b border-green-900/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-green-400">
            Udene
          </Link>
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-green-400 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-green-400 hover:text-green-300">
                    Solutions
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-[400px] bg-black/90 backdrop-blur-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <button 
                          onClick={() => scrollToSection('features')} 
                          className="block p-3 space-y-1 hover:bg-green-900/20 rounded-lg text-left"
                        >
                          <div className="font-medium text-green-400">Fraud Detection</div>
                          <p className="text-sm text-green-300/70">Real-time transaction monitoring</p>
                        </button>
                        <button 
                          onClick={() => scrollToSection('features')} 
                          className="block p-3 space-y-1 hover:bg-green-900/20 rounded-lg text-left"
                        >
                          <div className="font-medium text-green-400">Risk Assessment</div>
                          <p className="text-sm text-green-300/70">Advanced risk scoring system</p>
                        </button>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <button 
                    onClick={() => scrollToSection('pricing')} 
                    className="text-green-400 hover:text-green-300 px-4 py-2"
                  >
                    Pricing
                  </button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <button 
                    onClick={() => scrollToSection('about')} 
                    className="text-green-400 hover:text-green-300 px-4 py-2"
                  >
                    About
                  </button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="text-green-400 hover:text-green-300 hover:bg-green-900/20">
                  Sign In
                </Button>
              </Link>
              <Button 
                className="bg-green-500 text-black hover:bg-green-400"
                onClick={() => handleAuthenticatedNavigation('/dashboard')}
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 text-green-400 border-green-500/50 hover:bg-green-900/20"
                onClick={() => handleAuthenticatedNavigation('/client-dashboard')}
              >
                <Code className="w-4 h-4" />
                Developer
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-green-900/30 p-4 animate-fade-in">
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => scrollToSection('features')} 
                  className="text-green-400 hover:text-green-300 px-4 py-2 text-left"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('pricing')} 
                  className="text-green-400 hover:text-green-300 px-4 py-2 text-left"
                >
                  Pricing
                </button>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="text-green-400 hover:text-green-300 px-4 py-2 text-left"
                >
                  About
                </button>
                <div className="pt-4 border-t border-green-900/30">
                  <Link to="/login" className="block mb-3">
                    <Button variant="ghost" className="w-full text-green-400 hover:text-green-300 hover:bg-green-900/20">
                      Sign In
                    </Button>
                  </Link>
                  <Button 
                    className="w-full bg-green-500 text-black hover:bg-green-400 mb-3"
                    onClick={() => handleAuthenticatedNavigation('/dashboard')}
                  >
                    Get Started
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2 text-green-400 border-green-500/50 hover:bg-green-900/20"
                    onClick={() => handleAuthenticatedNavigation('/client-dashboard')}
                  >
                    <Code className="w-4 h-4" />
                    Developer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};