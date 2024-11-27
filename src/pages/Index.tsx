import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Activity, AlertTriangle, Shield, Users } from "lucide-react";
import { useEffect, useState } from "react";

const Index = () => {
  const { toast } = useToast();
  const [riskScore, setRiskScore] = useState(42);
  const [activeUsers, setActiveUsers] = useState(1234);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setRiskScore(prev => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 10)));
      setActiveUsers(prev => Math.max(0, prev + Math.floor((Math.random() - 0.5) * 10)));
      
      if (Math.random() > 0.8) {
        toast({
          title: "Potential Fraud Detected",
          description: "Unusual activity detected from IP 192.168.1.1",
          variant: "destructive",
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [toast]);

  return (
    <div className="min-h-screen bg-background p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Fraud Detection Dashboard</h1>
        <p className="text-muted-foreground">Real-time monitoring and analysis</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Risk Score</h3>
            <Shield className="text-secondary w-5 h-5" />
          </div>
          <div className="space-y-2">
            <Progress value={riskScore} className="h-2" />
            <p className="text-2xl font-bold">{riskScore.toFixed(1)}%</p>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Active Users</h3>
            <Users className="text-secondary w-5 h-5" />
          </div>
          <p className="text-2xl font-bold">{activeUsers.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Currently monitoring</p>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Alerts</h3>
            <AlertTriangle className="text-warning w-5 h-5" />
          </div>
          <p className="text-2xl font-bold">7</p>
          <p className="text-sm text-muted-foreground">Last 24 hours</p>
        </Card>

        <Card className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">API Calls</h3>
            <Activity className="text-secondary w-5 h-5" />
          </div>
          <p className="text-2xl font-bold">1.2M</p>
          <p className="text-sm text-muted-foreground">Today's requests</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card p-6">
          <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 p-3 rounded-md bg-background/50">
                <div className="w-2 h-2 rounded-full animate-pulse-slow" 
                     style={{ backgroundColor: i % 3 === 0 ? '#ff9800' : '#4caf50' }} />
                <div>
                  <p className="text-sm font-medium">
                    {i % 3 === 0 ? 'Suspicious login attempt' : 'Normal user activity'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(Date.now() - i * 1000 * 60 * 5).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="glass-card p-6">
          <h3 className="font-semibold text-foreground mb-4">Quick API Reference</h3>
          <div className="space-y-4">
            <div className="p-3 rounded-md bg-background/50">
              <p className="text-sm font-medium mb-1">Track User Interaction</p>
              <code className="text-xs text-muted-foreground block">
                POST /api/v1/track
              </code>
            </div>
            <div className="p-3 rounded-md bg-background/50">
              <p className="text-sm font-medium mb-1">Get Risk Score</p>
              <code className="text-xs text-muted-foreground block">
                GET /api/v1/risk/:userId
              </code>
            </div>
            <div className="p-3 rounded-md bg-background/50">
              <p className="text-sm font-medium mb-1">Configure Webhooks</p>
              <code className="text-xs text-muted-foreground block">
                PUT /api/v1/webhooks
              </code>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;