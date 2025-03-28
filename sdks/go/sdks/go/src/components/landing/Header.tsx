
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
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-green-900/30">
      <div className="bg-black/95 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-2xl font-bold text-green-400">
              Udene
            </Link>
            
            <button 
              className="lg:hidden text-green-400 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="hidden lg:flex items-center space-x-6">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-gray-300 hover:text-white">
                      Solutions
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[400px] gap-3 p-4 bg-black/95">
                        <div 
                          className="block p-3 space-y-1 hover:bg-green-500/10 rounded-lg cursor-pointer"
                          onClick={() => navigate('/features')}
                        >
                          <div className="font-medium text-green-400">Fraud Detection</div>
                          <p className="text-sm text-gray-400">Real-time transaction monitoring</p>
                        </div>
                        <div 
                          className="block p-3 space-y-1 hover:bg-green-500/10 rounded-lg cursor-pointer"
                          onClick={() => navigate('/features')}
                        >
                          <div className="font-medium text-green-400">Risk Assessment</div>
                          <p className="text-sm text-gray-400">Advanced risk scoring system</p>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <nav className="hidden lg:flex items-center space-x-6">
                <button className="text-gray-300 hover:text-white">Pricing</button>
                <button className="text-gray-300 hover:text-white">Documentation</button>
              </nav>

              <div className="hidden lg:flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  className="text-gray-300 hover:text-white"
                  onClick={() => navigate('/login')}
                >
                  Sign in
                </Button>
                <Button 
                  className="bg-green-500 text-white hover:bg-green-600"
                  onClick={() => handleAuthenticatedNavigation('/dashboard')}
                >
                  Get started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black/95 border-t border-green-900/30">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <button className="block w-full text-left text-gray-300 hover:text-white py-2">Solutions</button>
            <button className="block w-full text-left text-gray-300 hover:text-white py-2">Pricing</button>
            <button className="block w-full text-left text-gray-300 hover:text-white py-2">Documentation</button>
            
            <div className="pt-4 border-t border-green-900/30">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-gray-300 hover:text-white mb-3"
                onClick={() => navigate('/login')}
              >
                Sign in
              </Button>
              <Button 
                className="w-full bg-green-500 text-white hover:bg-green-600"
                onClick={() => handleAuthenticatedNavigation('/dashboard')}
              >
                Get started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
