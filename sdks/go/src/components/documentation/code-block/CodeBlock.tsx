import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock = ({ code, language = "bash" }: CodeBlockProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCopyCode = (code: string, snippetId: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(snippetId);
    toast({
      title: "Code copied",
      description: "The code snippet has been copied to your clipboard",
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="relative">
      <pre className="bg-black p-4 rounded-md overflow-x-auto border border-border/10">
        <code className="text-sm font-mono text-primary">{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2"
        onClick={() => handleCopyCode(code, code.substring(0, 10))}
      >
        {copiedId === code.substring(0, 10) ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};