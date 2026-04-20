"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/empty-state";

type AdminBooking = {
  id: string;
  bookingToken: number;
  estimatedWaitTime: number;
  status: string;
  service: { name: string };
  slot: { startTime: string };
  user: { email: string; fullName: string };
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const token = getToken();
    api
      .get("/admin/bookings", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setBookings(res.data));
  }, []);

  const filtered = useMemo(
    () =>
      bookings.filter(
        (booking) =>
          booking.service.name.toLowerCase().includes(query.toLowerCase()) ||
          booking.user.email.toLowerCase().includes(query.toLowerCase()) ||
          String(booking.bookingToken).includes(query),
      ),
    [bookings, query],
  );

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">Booking Monitor</h1>
      <Input placeholder="Search by service, user email, or token" value={query} onChange={(e) => setQuery(e.target.value)} />
      {filtered.length === 0 ? (
        <EmptyState title="No bookings to monitor" description="Bookings will appear here as users create them." />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-3 py-2 text-slate-700 dark:text-slate-200">User</th>
                <th className="px-3 py-2 text-slate-700 dark:text-slate-200">Service</th>
                <th className="px-3 py-2 text-slate-700 dark:text-slate-200">Token</th>
                <th className="px-3 py-2 text-slate-700 dark:text-slate-200">Slot</th>
                <th className="px-3 py-2 text-slate-700 dark:text-slate-200">Wait</th>
                <th className="px-3 py-2 text-slate-700 dark:text-slate-200">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((booking) => (
                <tr key={booking.id} className="border-t border-slate-200 dark:border-slate-700">
                  <td className="px-3 py-2 text-slate-900 dark:text-slate-100">
                    <p className="font-medium">{booking.user.fullName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{booking.user.email}</p>
                  </td>
                  <td className="px-3 py-2 text-slate-900 dark:text-slate-100">{booking.service.name}</td>
                  <td className="px-3 py-2 text-slate-900 dark:text-slate-100">{booking.bookingToken}</td>
                  <td className="px-3 py-2 text-slate-900 dark:text-slate-100">{new Date(booking.slot.startTime).toLocaleString()}</td>
                  <td className="px-3 py-2 text-slate-900 dark:text-slate-100">{booking.estimatedWaitTime} min</td>
                  <td className="px-3 py-2 text-slate-900 dark:text-slate-100">{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
