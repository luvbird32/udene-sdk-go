import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings, Shield, Users, Home, LogIn, UserPlus } from "lucide-react";

export function Navbar() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="border-b mb-6 py-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/">
            <Button 
              variant={isActive("/") ? "default" : "ghost"}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Button>
          </Link>
          <Link to="/users">
            <Button 
              variant={isActive("/users") ? "default" : "ghost"}
              className="flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              <span>Users</span>
            </Button>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/auth/mfa-setup">
            <Button 
              variant={isActive("/auth/mfa-setup") ? "default" : "ghost"}
              className="flex items-center gap-2"
            >
              <Shield className="h-4 w-4" />
              <span>Setup MFA</span>
            </Button>
          </Link>
          <Link to="/settings">
            <Button 
              variant={isActive("/settings") ? "default" : "ghost"}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Button>
          </Link>
          <div className="border-l pl-4 ml-4 flex items-center gap-4">
            <Link to="/signin">
              <Button 
                variant={isActive("/signin") ? "default" : "ghost"}
                className="flex items-center gap-2"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Button>
            </Link>
            <Link to="/register">
              <Button 
                variant={isActive("/register") ? "default" : "ghost"}
                className="flex items-center gap-2"
              >
                <UserPlus className="h-4 w-4" />
                <span>Register</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}