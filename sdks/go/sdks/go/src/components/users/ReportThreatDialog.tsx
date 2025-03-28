import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ReportThreatDialogProps {
  userId: string;
  userName: string;
}

export const ReportThreatDialog = ({ userId, userName }: ReportThreatDialogProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    threat_type: "",
    description: "",
    severity: "medium" as "low" | "medium" | "high" | "critical",
    evidence: {}
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('user_threat_reports')
        .insert({
          reported_user_id: userId,
          reporter_id: user.id,
          threat_type: formData.threat_type,
          description: formData.description,
          severity: formData.severity,
          evidence: formData.evidence,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Report Submitted",
        description: "The threat report has been submitted successfully.",
      });

      setOpen(false);
      setFormData({
        threat_type: "",
        description: "",
        severity: "medium",
        evidence: {}
      });
    } catch (error) {
      console.error("Error submitting threat report:", error);
      toast({
        title: "Error",
        description: "Failed to submit threat report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Report Threat
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report User Threat</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Reporting User</Label>
            <Input value={userName} disabled />
          </div>

          <div className="space-y-2">
            <Label>Threat Type</Label>
            <Select
              value={formData.threat_type}
              onValueChange={(value) => setFormData({ ...formData, threat_type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select threat type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="suspicious_behavior">Suspicious Behavior</SelectItem>
                <SelectItem value="automated_abuse">Automated Abuse</SelectItem>
                <SelectItem value="data_manipulation">Data Manipulation</SelectItem>
                <SelectItem value="unauthorized_access">Unauthorized Access</SelectItem>
                <SelectItem value="api_abuse">API Abuse</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Severity</Label>
            <Select
              value={formData.severity}
              onValueChange={(value: "low" | "medium" | "high" | "critical") => 
                setFormData({ ...formData, severity: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the suspicious activity or threat..."
              className="min-h-[100px]"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit Report"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};