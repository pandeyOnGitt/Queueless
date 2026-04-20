"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { Booking } from "@/lib/types";
import { BookingTable } from "@/components/booking-table";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = getToken();
    api
      .get("/bookings/my", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setBookings(res.data));
  }, []);

  const upcoming = bookings.filter((booking) => booking.status === "BOOKED");
  const past = bookings.filter((booking) => booking.status !== "BOOKED");

  const cancelBooking = async (id: string) => {
    const token = getToken();
    try {
      await api.patch(`/bookings/${id}/cancel`, {}, { headers: { Authorization: `Bearer ${token}` } });
      setMessage("Booking cancelled");
    } catch {
      setMessage("Cancel endpoint not available in backend yet");
    }
  };

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">My Bookings</h1>
      {message ? <p className="text-sm text-slate-600">{message}</p> : null}
      <section className="space-y-2">
        <h2 className="text-base font-semibold">Upcoming</h2>
        {upcoming.length === 0 ? (
          <EmptyState title="No upcoming bookings" description="Your confirmed slots will appear here." />
        ) : (
          <>
            <BookingTable bookings={upcoming} />
            <div className="flex flex-wrap gap-2">
              {upcoming.map((booking) => (
                <Button
                  key={booking.id}
                  type="button"
                  className="bg-rose-600 hover:bg-rose-500"
                  onClick={() => cancelBooking(booking.id)}
                >
                  Cancel {booking.bookingToken}
                </Button>
              ))}
            </div>
          </>
        )}
      </section>
      <section className="space-y-2">
        <h2 className="text-base font-semibold">Past</h2>
        {past.length === 0 ? <EmptyState title="No past bookings" description="Completed and cancelled bookings appear here." /> : <BookingTable bookings={past} />}
      </section>
    </div>
  );
}
