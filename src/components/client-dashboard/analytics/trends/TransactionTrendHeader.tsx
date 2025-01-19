interface TransactionTrendHeaderProps {
  title: string;
}

export const TransactionTrendHeader = ({ title }: TransactionTrendHeaderProps) => (
  <h3 className="font-semibold mb-4 text-white">{title}</h3>
);