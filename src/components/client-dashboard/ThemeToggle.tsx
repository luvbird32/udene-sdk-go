import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsAnimating(true);
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
    
    // Reset animation state after transition
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className={`
        w-10 h-10 rounded-full
        dark:bg-gray-800 bg-white
        dark:hover:bg-gray-700 hover:bg-gray-100
        border dark:border-gray-700 border-gray-200
        transition-all duration-300 ease-in-out
        ${isAnimating ? 'scale-90' : 'scale-100'}
      `}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <Sun 
        className={`
          h-[1.2rem] w-[1.2rem] 
          rotate-0 scale-100 transition-all 
          dark:-rotate-90 dark:scale-0 
          text-amber-500 dark:text-amber-400
        `} 
      />
      <Moon 
        className={`
          absolute h-[1.2rem] w-[1.2rem] 
          rotate-90 scale-0 transition-all 
          dark:rotate-0 dark:scale-100
          text-slate-800 dark:text-slate-200
        `} 
      />
    </Button>
  );
};