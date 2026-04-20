"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { Service } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [avgServiceTime, setAvgServiceTime] = useState("5");
  const [slotDuration, setSlotDuration] = useState("15");
  const [slotCapacity, setSlotCapacity] = useState("5");
  const [openingTime, setOpeningTime] = useState("09:00");
  const [closingTime, setClosingTime] = useState("17:00");

  const loadServices = () => {
    api.get("/services").then((res) => setServices(res.data));
  };

  useEffect(() => {
    loadServices();
  }, []);

  const createService = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getToken();
    await api.post(
      "/services",
      {
        name,
        description,
        location,
        avgServiceTime: Number(avgServiceTime),
        status: "OPEN",
        slotDuration: Number(slotDuration),
        slotCapacity: Number(slotCapacity),
        openingTime,
        closingTime,
      },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    setName("");
    setDescription("");
    setLocation("");
    loadServices();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Admin Services</h1>
      <form onSubmit={createService} className="grid gap-2 rounded-2xl border bg-white p-4 md:grid-cols-2">
        <Input placeholder="Service name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Input
          placeholder="Average service time (min)"
          value={avgServiceTime}
          onChange={(e) => setAvgServiceTime(e.target.value)}
        />
        <Input placeholder="Slot duration" value={slotDuration} onChange={(e) => setSlotDuration(e.target.value)} />
        <Input placeholder="Slot capacity" value={slotCapacity} onChange={(e) => setSlotCapacity(e.target.value)} />
        <Input placeholder="Opening time" value={openingTime} onChange={(e) => setOpeningTime(e.target.value)} />
        <Input placeholder="Closing time" value={closingTime} onChange={(e) => setClosingTime(e.target.value)} />
        <Button type="submit" className="md:col-span-2">
          Create Service
        </Button>
      </form>
      <div className="grid gap-3 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.id} className="space-y-1">
            <div className="flex items-center justify-between gap-2">
              <p className="font-medium">{service.name}</p>
              <StatusBadge value={service.status} />
            </div>
            <p className="text-sm text-slate-600">{service.location}</p>
            <p className="text-sm">Queue: {service.currentQueueLength}</p>
            <p className="text-sm">Avg service time: {service.avgServiceTime} min</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
