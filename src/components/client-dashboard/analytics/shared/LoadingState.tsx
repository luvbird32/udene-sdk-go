import { Card } from "@/components/ui/card";

interface LoadingStateProps {
  title: string;
}

export const LoadingState = ({ title }: LoadingStateProps) => {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">{title}</h3>
      <div className="h-[300px] flex items-center justify-center">
        <p className="text-muted-foreground">Loading data...</p>
      </div>
    </Card>
  );
};