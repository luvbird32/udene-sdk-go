import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({ message }: LoadingStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <Loader2 className="h-8 w-8 animate-spin" />
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
};

export { LoadingSpinner } from './LoadingSpinner';