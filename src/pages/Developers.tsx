import { DashboardHeader } from "@/components/dashboard/header/DashboardHeader";
import { MatrixBackground } from "@/components/dashboard/background/MatrixBackground";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Developers = () => {
  const { data: apiKeys, isLoading } = useQuery({
    queryKey: ["api-keys"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="min-h-screen bg-black text-green-400 p-6 relative overflow-hidden" role="main">
      <MatrixBackground />
      <div className="relative z-10">
        <div className="glass-card p-6 rounded-lg w-full max-w-2xl mb-8">
          <h2 className="text-4xl font-bold text-green-400 animate-pulse-slow" tabIndex={0}>
            Developer Portal
          </h2>
          <p className="text-green-300/80" tabIndex={0}>
            API Documentation and Developer Resources
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="p-6 bg-black/50 border-green-500/30">
            <h3 className="text-xl font-semibold mb-4">API Keys</h3>
            {isLoading ? (
              <p>Loading API keys...</p>
            ) : (
              <div className="space-y-4">
                {apiKeys?.map((key) => (
                  <div key={key.id} className="p-4 border border-green-500/30 rounded-lg">
                    <p className="font-mono text-sm">{key.key_value}</p>
                    <p className="text-sm text-green-300/70 mt-2">{key.name}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card className="p-6 bg-black/50 border-green-500/30">
            <h3 className="text-xl font-semibold mb-4">Documentation</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-green-400 hover:text-green-300 transition-colors">
                  Getting Started Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-green-400 hover:text-green-300 transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-green-400 hover:text-green-300 transition-colors">
                  SDK Documentation
                </a>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Developers;