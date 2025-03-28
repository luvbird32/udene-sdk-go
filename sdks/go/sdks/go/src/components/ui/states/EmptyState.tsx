interface EmptyStateProps {
  title?: string;
  message: string;
}

export const EmptyState = ({ title, message }: EmptyStateProps) => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        {title && <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>}
        <p className="text-white/60">{message}</p>
      </div>
    </div>
  );
};