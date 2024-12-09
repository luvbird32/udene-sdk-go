import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const Header = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm border-b border-green-900/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-green-400">
              Udene
            </Link>
            
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
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-green-400 hover:text-green-300 hover:bg-green-900/20">
                Sign In
              </Button>
            </Link>
            <Link to="/login">
              <Button className="bg-green-500 text-black hover:bg-green-400">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};