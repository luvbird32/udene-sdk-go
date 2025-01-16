import { useServices } from './hooks/useServices';
import { ServiceList } from './components/ServiceList';
import { LoadingSpinner } from '@/components/ui/states/LoadingSpinner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export const ServiceManager = () => {
  const { services, isLoading, error, handleToggle } = useServices();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load services. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <ServiceList
        activeServices={services || []}
        handleToggle={handleToggle}
      />
    </div>
  );
};