import { Card } from "@/components/ui/card";

interface TransactionTrendHeaderProps {
  title: string;
}

export const TransactionTrendHeader = ({ title }: TransactionTrendHeaderProps) => (
  <h3 className="font-semibold mb-4">{title}</h3>
);