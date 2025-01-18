import { ScrollArea } from "@/components/ui/scroll-area";
import { BiometricVerificationItem } from "./BiometricVerificationItem";
import type { BiometricVerification } from "@/types/verification";

interface BiometricVerificationListProps {
  verifications: BiometricVerification[];
}

export const BiometricVerificationList = ({ verifications }: BiometricVerificationListProps) => {
  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {verifications.map((verification) => (
          <BiometricVerificationItem 
            key={verification.id} 
            verification={verification}
          />
        ))}
      </div>
    </ScrollArea>
  );
};