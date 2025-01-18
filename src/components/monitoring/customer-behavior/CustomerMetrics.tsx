interface CustomerMetricsProps {
  customer: CustomerPattern;
}

export const CustomerMetrics = ({ customer }: CustomerMetricsProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 text-sm">
      <div>
        <p className="text-muted-foreground">Velocity</p>
        <p>{customer.velocity} tx/hour</p>
      </div>
      <div>
        <p className="text-muted-foreground">Devices</p>
        <p>{customer.deviceCount}</p>
      </div>
      <div>
        <p className="text-muted-foreground">Locations</p>
        <p>{customer.locationCount}</p>
      </div>
    </div>
  );
};