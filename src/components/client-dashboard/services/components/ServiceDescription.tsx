interface ServiceDescriptionProps {
  serviceType: string;
  isActive: boolean;
}

export const ServiceDescription = ({ serviceType, isActive }: ServiceDescriptionProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white">How This Helps You</h3>
        <p className="text-sm text-white">
          {getServiceDescription(serviceType)}
        </p>
      </div>
      {isActive && (
        <div className="space-y-2">
          <h4 className="font-medium text-white">Benefits</h4>
          <ul className="list-disc pl-4 space-y-1">
            {getServiceBenefits(serviceType).map((benefit, index) => (
              <li key={index} className="text-sm text-white">
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const getServiceDescription = (serviceType: string): string => {
  switch (serviceType) {
    case 'security':
      return 'This service provides comprehensive security monitoring and threat detection.';
    case 'compliance':
      return 'This service helps you manage and track compliance requirements effectively.';
    case 'performance':
      return 'This service optimizes your application performance and user experience.';
    default:
      return 'This service offers various benefits tailored to your needs.';
  }
};

const getServiceBenefits = (serviceType: string): string[] => {
  switch (serviceType) {
    case 'security':
      return [
        'Real-time threat detection',
        'Automated security assessments',
        'Detailed vulnerability reports',
      ];
    case 'compliance':
      return [
        'Automated compliance tracking',
        'Audit readiness',
        'Risk assessment tools',
      ];
    case 'performance':
      return [
        'Performance monitoring',
        'User experience optimization',
        'Detailed analytics and reporting',
      ];
    default:
      return ['Tailored benefits based on your service type.'];
  }
};