import { Card } from "@/components/ui/card";
import { Service, Slot } from "@/lib/types";

type Props = {
  service?: Service;
  slot?: Slot;
};

export function BookingSummaryCard({ service, slot }: Props) {
  const wait = service ? service.currentQueueLength * service.avgServiceTime : 0;

  return (
    <Card className="space-y-2">
      <h3 className="font-semibold">Booking Summary</h3>
      <p className="text-sm text-slate-600">Service: {service?.name ?? "-"}</p>
      <p className="text-sm text-slate-600">Slot: {slot ? new Date(slot.startTime).toLocaleString() : "-"}</p>
      <p className="text-sm text-slate-600">Estimated wait: {wait} min</p>
      <p className="text-sm text-slate-600">Token preview: ~{(service?.currentToken ?? 0) + 1}</p>
    </Card>
  );
}
