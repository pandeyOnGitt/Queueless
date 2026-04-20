"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { Service, Slot } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function AdminSlotsPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [serviceId, setServiceId] = useState("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [capacity, setCapacity] = useState("5");

  useEffect(() => {
    api.get("/services").then((res) => setServices(res.data));
  }, []);

  const loadSlots = async (id: string) => {
    if (!id) return;
    const res = await api.get(`/slots/service/${id}`);
    setSlots(res.data);
  };

  const createSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getToken();
    await api.post(
      "/slots",
      {
        serviceId,
        startTime,
        endTime,
        capacity: Number(capacity),
      },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    loadSlots(serviceId);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Admin Slots</h1>
      <form onSubmit={createSlot} className="space-y-2 rounded-2xl border bg-white p-4">
        <select
          value={serviceId}
          onChange={(e) => {
            setServiceId(e.target.value);
            loadSlots(e.target.value);
          }}
          className="w-full rounded-md border border-slate-300 px-3 py-2"
        >
          <option value="">Select service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
        <Input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        <Input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        <Input value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="Capacity" />
        <Button type="submit" disabled={!serviceId || !startTime || !endTime}>
          Create Slot
        </Button>
      </form>
      <div className="grid gap-2">
        {slots.map((slot) => (
          <Card key={slot.id} className="space-y-1">
            <p className="text-sm">{new Date(slot.startTime).toLocaleString()}</p>
            <p className="text-sm">
              Booked: {slot.booked}/{slot.capacity}
            </p>
            <p className="text-sm">Status: {slot.status}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
