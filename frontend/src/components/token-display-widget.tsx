import { Card } from "@/components/ui/card";

type Props = {
  token: number;
  label?: string;
};

export function TokenDisplayWidget({ token, label = "Current Token" }: Props) {
  return (
    <Card className="text-center">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="text-4xl font-black text-indigo-600">{token}</p>
    </Card>
  );
}
