"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Activity, ArrowRight } from "lucide-react";
import { api } from "@/lib/api";
import { Service, Slot } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";

type ServiceDetails = Service & { slots?: Slot[] };

export default function ServiceDetailsPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<ServiceDetails | null>(null);

  useEffect(() => {
    api.get<ServiceDetails>(`/services/${params.id}`).then((res) => setData(res.data));
  }, [params.id]);

  if (!data) {
    return <p>Loading service...</p>;
  }

  const estimatedWait = data.currentQueueLength * data.avgServiceTime;
  const progress = Math.min((data.currentQueueLength / 30) * 100, 100);

  return (
    <div className="space-y-5">
      <Card className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold">{data.name}</h1>
            <p className="text-sm text-slate-500">{data.location}</p>
          </div>
          <StatusBadge value={data.status} />
        </div>
        <p className="text-slate-600">{data.description}</p>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Current token</p>
            <p className="text-xl font-bold">{data.currentToken}</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Live queue length</p>
            <p className="text-xl font-bold">{data.currentQueueLength}</p>
          </div>
          <div className="rounded-xl bg-indigo-50 p-3">
            <p className="text-xs text-indigo-700">Predicted wait</p>
            <p className="text-xl font-bold text-indigo-700">{estimatedWait} min</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="inline-flex items-center gap-2 text-sm font-medium">
            <Activity className="h-4 w-4 text-indigo-600" />
            Queue progress
          </p>
          <div className="h-2 rounded-full bg-slate-200">
            <div className="h-2 rounded-full bg-indigo-600 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <Link href="/book-slot">
          <Button>
            Book This Service <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </Card>
      <Card>
        <h2 className="mb-3 text-lg font-semibold">Available Slots</h2>
        <div className="space-y-2 text-sm">
          {data.slots?.map((slot) => (
            <div key={slot.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
              <p>
                {new Date(slot.startTime).toLocaleString()} - {new Date(slot.endTime).toLocaleTimeString()}
              </p>
              <p className="font-semibold">
                {slot.booked}/{slot.capacity}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
