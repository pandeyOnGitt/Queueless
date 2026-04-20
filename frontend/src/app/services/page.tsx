"use client";

import { useEffect, useState } from "react";
import { ServiceCard } from "@/components/service-card";
import { api } from "@/lib/api";
import { Service } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/empty-state";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    api.get<Service[]>("/services").then((res) => setServices(res.data));
  }, []);

  const filtered = services.filter((service) => {
    const matchQuery =
      service.name.toLowerCase().includes(query.toLowerCase()) ||
      service.location.toLowerCase().includes(query.toLowerCase());
    const matchStatus = statusFilter === "ALL" || service.status === statusFilter;
    return matchQuery && matchStatus;
  });

  return (
    <div className="space-y-4">
      <div className="surface rounded-2xl border p-4">
        <div className="grid gap-3 md:grid-cols-3">
          <Input placeholder="Search by service or location" value={query} onChange={(e) => setQuery(e.target.value)} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm"
          >
            <option value="ALL">All statuses</option>
            <option value="OPEN">Open</option>
            <option value="BUSY">Busy</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>
      {filtered.length === 0 ? (
        <EmptyState title="No services found" description="Try a different search term or status filter." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}
