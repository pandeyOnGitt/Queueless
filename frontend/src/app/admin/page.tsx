"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { DashboardStats } from "@/lib/types";
import { DashboardWidget } from "@/components/dashboard-widget";
import { Card } from "@/components/ui/card";

export default function AdminPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      const token = getToken();
      try {
        const res = await api.get("/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err: any) {
        const status = err?.response?.status;
        if (status === 401 || status === 403) {
          setError("Admin access required. Redirecting to user dashboard...");
          setTimeout(() => router.replace("/dashboard"), 900);
          return;
        }
        setError("Unable to load admin dashboard right now.");
      }
    };

    loadDashboard();
  }, [router]);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      {error ? <Card className="text-sm text-rose-600">{error}</Card> : null}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <DashboardWidget title="Total Services" value={stats?.totalServices ?? "-"} />
        <DashboardWidget title="Total Bookings" value={stats?.totalBookings ?? "-"} />
        <DashboardWidget title="Active Bookings" value={stats?.activeBookings ?? "-"} />
        <DashboardWidget title="Available Slots" value={stats?.availableSlots ?? "-"} />
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="space-y-2">
          <h2 className="text-base font-semibold">Queue Load Snapshot</h2>
          <div className="space-y-2">
            {[
              { label: "Office counters", value: 68 },
              { label: "Hospital desks", value: 84 },
              { label: "Bank counters", value: 52 },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex justify-between text-xs text-slate-500">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div className="h-2 rounded-full bg-indigo-600" style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="space-y-2">
          <h2 className="text-base font-semibold">Quick Actions</h2>
          <div className="grid gap-2 text-sm">
            <Link href="/admin/services" className="rounded-lg bg-slate-100 px-3 py-2 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700">
              Create or edit services
            </Link>
            <Link href="/admin/users" className="rounded-lg bg-slate-100 px-3 py-2 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700">
              Manage users and access
            </Link>
            <Link href="/admin/queue" className="rounded-lg bg-slate-100 px-3 py-2 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700">
              Control queue status in real time
            </Link>
            <Link href="/admin/slots" className="rounded-lg bg-slate-100 px-3 py-2 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700">
              Manage slot inventory and capacity
            </Link>
            <Link href="/admin/bookings" className="rounded-lg bg-slate-100 px-3 py-2 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700">
              Monitor booking activity
            </Link>
          </div>
        </Card>
      </div>
      <Card className="flex flex-wrap gap-3">
        <Link href="/admin/services" className="text-indigo-600">
          Manage Services
        </Link>
        <Link href="/admin/users" className="text-indigo-600">
          Manage Users
        </Link>
        <Link href="/admin/queue" className="text-indigo-600">
          Manage Queue
        </Link>
        <Link href="/admin/slots" className="text-indigo-600">
          Manage Slots
        </Link>
        <Link href="/admin/bookings" className="text-indigo-600">
          Booking Monitor
        </Link>
      </Card>
    </div>
  );
}
