import { Globe, Cpu } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { DeviceFingerprint } from "../types";

interface DeviceInfoProps {
  device: DeviceFingerprint;
}

export const DeviceInfo = ({ device }: DeviceInfoProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 text-sm">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">
              {(device.network_info as { ip_address?: string })?.ip_address || 'Unknown IP'}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>IP Address</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">
              {(device.hardware_info as { platform?: string })?.platform || 'Unknown Platform'}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Hardware Info</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};