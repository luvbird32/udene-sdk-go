import { Button } from "@/components/shared/ui/Button";
import { Users, ScanSearch, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const DashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="flex gap-4">
        <Button 
          variant="outline"
          onClick={() => navigate('/investigations')}
          className="flex items-center gap-2"
        >
          <Search className="h-4 w-4" />
          Investigations
        </Button>
        <Button 
          variant="outline"
          onClick={() => navigate('/security-scan')}
          className="flex items-center gap-2"
        >
          <ScanSearch className="h-4 w-4" />
          Security Scan
        </Button>
        <Button 
          variant="outline"
          onClick={() => navigate('/users')}
          className="flex items-center gap-2"
        >
          <Users className="h-4 w-4" />
          User Management
        </Button>
      </div>
    </div>
  );
};