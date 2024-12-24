import { 
  Play,
  Pause,
  StopCircle,
  RefreshCw,
  FileJson,
  AlertTriangle,
  Clock,
  Download,
  Share2,
  Mail,
  FileText,
  Calendar
} from "lucide-react";

export const scanActions = [
  {
    id: "start",
    label: "Start New Scan",
    icon: Play,
    action: "Start New Scan",
    disabledWhen: "isScanning"
  },
  {
    id: "pause",
    label: "Pause Scan",
    icon: Pause,
    action: "Pause Scan",
    enabledWhen: "isScanning"
  },
  {
    id: "stop",
    label: "Stop Scan",
    icon: StopCircle,
    action: "Stop Scan",
    enabledWhen: "isScanning"
  },
  {
    id: "resume",
    label: "Resume Scan",
    icon: RefreshCw,
    action: "Resume Scan",
    enabledWhen: "isScanning"
  }
];

export const reportActions = [
  {
    id: "export",
    label: "Export Results",
    icon: FileJson,
    action: "Export Results",
    variant: "outline" as const
  },
  {
    id: "report-issue",
    label: "Report Issue",
    icon: AlertTriangle,
    action: "Report Issue",
    variant: "destructive" as const
  },
  {
    id: "schedule",
    label: "Schedule",
    icon: Clock,
    action: "Schedule",
    variant: "outline" as const
  },
  {
    id: "download",
    label: "Download Previous",
    icon: Download,
    action: "Download Previous",
    variant: "outline" as const
  },
  {
    id: "share",
    label: "Share Results",
    icon: Share2,
    action: "Share",
    variant: "outline" as const
  },
  {
    id: "email",
    label: "Email Report",
    icon: Mail,
    action: "Email",
    variant: "outline" as const
  },
  {
    id: "generate",
    label: "Generate Report",
    icon: FileText,
    action: "Generate Report",
    variant: "outline" as const
  },
  {
    id: "calendar",
    label: "Add to Calendar",
    icon: Calendar,
    action: "Calendar",
    variant: "outline" as const
  }
];