import Link from "next/link";
import { Clock3, MapPin, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Service } from "@/lib/types";
import { StatusBadge } from "@/components/status-badge";

type Props = {
  service: Service;
};

export function ServiceCard({ service }: Props) {
  const estimatedWait = service.currentQueueLength * service.avgServiceTime;
  const nextSlot = `${service.openingTime} - ${service.closingTime}`;

  return (
    <Card className="space-y-3 transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold">{service.name}</h3>
        <StatusBadge value={service.status} />
      </div>
      <p className="line-clamp-2 text-sm text-slate-600">{service.description}</p>
      <p className="inline-flex items-center gap-1 text-sm text-slate-600">
        <MapPin className="h-4 w-4" />
        {service.location}
      </p>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-xl bg-slate-50 p-2">
          <p className="inline-flex items-center gap-1 text-slate-500">
            <Users className="h-4 w-4" />
            Queue
          </p>
          <p className="font-semibold">{service.currentQueueLength}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-2">
          <p className="inline-flex items-center gap-1 text-slate-500">
            <Clock3 className="h-4 w-4" />
            Avg time
          </p>
          <p className="font-semibold">{service.avgServiceTime} min</p>
        </div>
      </div>
      <div className="rounded-xl bg-indigo-50 p-3 text-sm">
        <p className="text-indigo-700">Predicted wait: {estimatedWait} min</p>
        <p className="text-indigo-600">Next slot window: {nextSlot}</p>
      </div>
      <Link href={`/services/${service.id}`} className="inline-block text-sm font-semibold text-indigo-600">
        View details
      </Link>
    </Card>
  );
}
