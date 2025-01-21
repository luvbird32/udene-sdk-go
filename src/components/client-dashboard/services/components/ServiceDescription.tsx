import { formatServiceType } from '@/utils';

interface ServiceDescriptionProps {
  serviceType: string;
}

export const ServiceDescription = ({ serviceType }: ServiceDescriptionProps) => {
  const getServiceDescription = (type: string) => {
    const formattedType = formatServiceType(type);
    
    switch (type.toLowerCase()) {
      case 'email_security':
        return {
          title: `${formattedType} Protection`,
          description: 'Protect your organization from email-based threats including phishing, spam, and malware.',
          benefits: [
            'Advanced email filtering and threat detection',
            'Protection against phishing attempts',
            'Malware scanning and prevention',
            'Spam filtering and content analysis'
          ]
        };
      case 'device_fingerprinting':
        return {
          title: `${formattedType}`,
          description: 'Identify and track devices accessing your system for enhanced security.',
          benefits: [
            'Unique device identification',
            'Fraud prevention through device tracking',
            'Risk assessment based on device history',
            'Suspicious device detection'
          ]
        };
      case 'ip_intelligence':
        return {
          title: `${formattedType}`,
          description: 'Analyze and evaluate IP addresses for potential security risks.',
          benefits: [
            'IP reputation checking',
            'Geolocation analysis',
            'VPN and proxy detection',
            'Traffic pattern analysis'
          ]
        };
      default:
        return {
          title: formattedType,
          description: 'Enhance your security with our advanced protection services.',
          benefits: [
            'Advanced threat detection',
            'Real-time monitoring',
            'Automated response actions',
            'Detailed security reporting'
          ]
        };
    }
  };

  const serviceInfo = getServiceDescription(serviceType);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{serviceInfo.title}</h3>
      <p className="text-gray-600">{serviceInfo.description}</p>
      <div className="space-y-2">
        <h4 className="font-medium">How this helps you:</h4>
        <ul className="list-disc pl-5 space-y-1">
          {serviceInfo.benefits.map((benefit, index) => (
            <li key={index} className="text-gray-600">{benefit}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};