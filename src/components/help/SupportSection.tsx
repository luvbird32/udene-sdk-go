
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export const SupportSection = () => {
  return (
    <div className="mt-12 bg-black/20 rounded-lg p-8">
      <h2 className="text-2xl font-semibold mb-4">Need Additional Support?</h2>
      <p className="text-gray-300 mb-6">
        Our dedicated support team is available 24/7 to assist you with any questions or concerns.
        Connect with our community forum to share experiences and get insights from other users.
      </p>
      <div className="flex flex-wrap gap-4">
        <Link to="/documentation">
          <Button variant="default" className="flex items-center gap-2">
            View Documentation <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
        <Button variant="outline" className="flex items-center gap-2">
          Join Community Forum <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
