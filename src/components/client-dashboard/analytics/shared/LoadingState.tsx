import { Card } from "@/components/ui/card";

interface LoadingStateProps {
  title: string;
  height?: string;
}

export const LoadingState = ({ title, height = "300px" }: LoadingStateProps) => {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">{title}</h3>
      <div className={`h-[${height}] flex items-center justify-center`}>
        <p className="text-muted-foreground">Loading data...</p>
      </div>
    </Card>
  );
};