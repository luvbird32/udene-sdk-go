import { ClientSettingsForm } from "@/components/client-settings/ClientSettingsForm";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ClientSettings = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/client-dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-sm">
          <ClientSettingsForm />
        </div>
      </div>
    </div>
  );
};

export default ClientSettings;