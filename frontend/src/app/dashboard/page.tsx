"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Clock3, Ticket, TimerReset } from "lucide-react";
import { api } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { Booking, Service } from "@/lib/types";
import { DashboardWidget } from "@/components/dashboard-widget";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";
import { EmptyState } from "@/components/empty-state";

export default function DashboardPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const token = getToken();
    api.get("/services").then((res) => setServices(res.data));
    api.get("/bookings/my", { headers: { Authorization: `Bearer ${token}` } }).then((res) => setBookings(res.data));
  }, []);

  const activeBookings = useMemo(() => bookings.filter((booking) => booking.status === "BOOKED"), [bookings]);
  const nextBooking = activeBookings[0];
  const avgPredictedWait = useMemo(() => {
    if (services.length === 0) return 0;
    return Math.round(
      services.reduce((sum, service) => sum + service.currentQueueLength * service.avgServiceTime, 0) / services.length,
    );
  }, [services]);

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">User Dashboard</h1>
        <p className="text-sm text-slate-500">Track your bookings, queue status, and estimated waiting times in one place.</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <DashboardWidget title="Active Bookings" value={activeBookings.length} />
        <DashboardWidget title="Services Open" value={services.filter((service) => service.status === "OPEN").length} />
        <DashboardWidget title="Avg Predicted Wait" value={`${avgPredictedWait} min`} />
        <DashboardWidget title="Total Services" value={services.length} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="space-y-3 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Service Snapshot</h2>
            <Link href="/services" className="text-sm font-semibold text-indigo-600">
              View all
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {services.slice(0, 4).map((service) => {
              const wait = service.currentQueueLength * service.avgServiceTime;
              return (
                <div key={service.id} className="rounded-xl border border-slate-200 bg-white p-3">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="font-semibold">{service.name}</p>
                    <StatusBadge value={service.status} />
                  </div>
                  <p className="text-sm text-slate-500">{service.location}</p>
                  <p className="mt-1 text-sm">Queue: {service.currentQueueLength}</p>
                  <p className="text-sm">Predicted wait: {wait} min</p>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="space-y-3">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <Link href="/book-slot" className="flex items-center justify-between rounded-xl bg-indigo-50 px-3 py-2 text-sm">
            Book a slot <ArrowRight className="h-4 w-4 text-indigo-600" />
          </Link>
          <Link href="/live-queue" className="flex items-center justify-between rounded-xl bg-indigo-50 px-3 py-2 text-sm">
            Track live queue <ArrowRight className="h-4 w-4 text-indigo-600" />
          </Link>
          <Link href="/bookings" className="flex items-center justify-between rounded-xl bg-indigo-50 px-3 py-2 text-sm">
            My bookings <ArrowRight className="h-4 w-4 text-indigo-600" />
          </Link>
        </Card>
      </div>

      <Card className="space-y-3">
        <h2 className="text-lg font-semibold">Next Booking</h2>
        {!nextBooking ? (
          <EmptyState title="No upcoming booking" description="Book your next slot to avoid long queues." />
        ) : (
          <div className="grid gap-3 md:grid-cols-4">
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="inline-flex items-center gap-1 text-xs text-slate-500">
                <Ticket className="h-3.5 w-3.5" />
                Token
              </p>
              <p className="text-xl font-bold">{nextBooking.bookingToken}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="inline-flex items-center gap-1 text-xs text-slate-500">
                <Clock3 className="h-3.5 w-3.5" />
                Service
              </p>
              <p className="text-sm font-semibold">{nextBooking.service.name}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="inline-flex items-center gap-1 text-xs text-slate-500">
                <TimerReset className="h-3.5 w-3.5" />
                Slot
              </p>
              <p className="text-sm font-semibold">{new Date(nextBooking.slot.startTime).toLocaleString()}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Status</p>
              <p className="text-sm font-semibold">{nextBooking.status}</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
