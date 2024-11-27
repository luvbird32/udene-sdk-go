import { Navbar } from "./Navbar";
import { Toaster } from "@/components/ui/toaster";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isAuthPage = ['/signin', '/register', '/auth/reset-password'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-background">
      {!isAuthPage && <Navbar />}
      <main className={`container mx-auto px-4 ${isAuthPage ? 'pt-0' : 'pt-6'}`}>
        {children}
      </main>
      <Toaster />
    </div>
  );
}