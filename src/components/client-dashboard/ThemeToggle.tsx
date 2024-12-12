import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<"dark">("dark");

  useEffect(() => {
    // Since we removed light mode, we'll ensure dark mode is always active
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <Button
      variant="outline"
      size="icon"
      className="glass-button w-10 h-10 bg-black/40 hover:bg-black/60 border-white/10"
      aria-label="Theme toggle"
    >
      <Sun className="h-5 w-5 text-white/80" />
    </Button>
  );
};