import { Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ThemeToggle = () => {
  return (
    <Button
      variant="outline"
      size="icon"
      className="w-10 h-10 rounded-full dark:bg-gray-800 dark:hover:bg-gray-700 border dark:border-gray-700 transition-all duration-300 ease-in-out"
      aria-label="Dark mode is enabled"
      disabled
    >
      <Moon className="h-[1.2rem] w-[1.2rem] text-slate-200" />
    </Button>
  );
};