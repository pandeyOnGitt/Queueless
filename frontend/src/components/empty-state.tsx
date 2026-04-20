import { Inbox } from "lucide-react";
import { Card } from "@/components/ui/card";

type Props = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: Props) {
  return (
    <Card className="flex flex-col items-center justify-center gap-2 py-10 text-center">
      <Inbox className="h-6 w-6 text-slate-400" />
      <p className="font-semibold">{title}</p>
      <p className="max-w-sm text-sm text-slate-500">{description}</p>
    </Card>
  );
}
