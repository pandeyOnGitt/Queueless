import { Card } from "@/components/ui/card";

type Props = {
  title: string;
  value: string | number;
};

export function DashboardWidget({ title, value }: Props) {
  return (
    <Card>
      <p className="text-sm text-slate-600">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </Card>
  );
}
