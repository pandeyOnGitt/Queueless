"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { QueueStatus, Service } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QueueStatusDisplay } from "@/components/queue-status-display";
import { Card } from "@/components/ui/card";

export default function AdminQueuePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [serviceId, setServiceId] = useState("");
  const [currentQueueLength, setCurrentQueueLength] = useState("0");
  const [currentToken, setCurrentToken] = useState("0");
  const [queueState, setQueueState] = useState<QueueStatus | null>(null);

  useEffect(() => {
    api.get("/services").then((res) => setServices(res.data));
  }, []);

  const loadQueue = async () => {
    if (!serviceId) return;
    const res = await api.get(`/queue/service/${serviceId}`);
    setQueueState(res.data);
  };

  const updateQueue = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getToken();
    await api.patch(
      `/queue/service/${serviceId}`,
      {
        currentQueueLength: Number(currentQueueLength),
        currentToken: Number(currentToken),
      },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    loadQueue();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Admin Queue Management</h1>
      <form onSubmit={updateQueue} className="space-y-2 rounded-2xl border bg-white p-4">
        <select
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2"
        >
          <option value="">Select service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
        <Input
          placeholder="Queue length"
          value={currentQueueLength}
          onChange={(e) => setCurrentQueueLength(e.target.value)}
        />
        <Input placeholder="Current token" value={currentToken} onChange={(e) => setCurrentToken(e.target.value)} />
        <div className="flex gap-2">
          <Button type="submit">Update Queue</Button>
          <Button type="button" className="bg-slate-700 hover:bg-slate-600" onClick={loadQueue}>
            Refresh Status
          </Button>
        </div>
      </form>
      {queueState ? (
        <QueueStatusDisplay queue={queueState} title="Current Queue Status" />
      ) : (
        <Card className="text-sm text-slate-500">Select a service and refresh queue status.</Card>
      )}
    </div>
  );
}
