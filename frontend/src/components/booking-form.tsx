"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { Service, Slot } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { BookingSummaryCard } from "@/components/booking-summary-card";
import { Card } from "@/components/ui/card";

export function BookingForm() {
  const [services, setServices] = useState<Service[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [serviceId, setServiceId] = useState("");
  const [slotId, setSlotId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    api.get("/services").then((res) => setServices(res.data));
  }, []);

  useEffect(() => {
    if (!serviceId) {
      setSlots([]);
      setSlotId("");
      return;
    }

    setSlotsLoading(true);
    api
      .get(`/slots/service/${serviceId}`)
      .then((res) => setSlots(res.data))
      .catch(() => {
        setSlots([]);
        setError("Could not load slots right now.");
      })
      .finally(() => setSlotsLoading(false));
  }, [serviceId]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const token = getToken();
      const res = await api.post(
        "/bookings",
        { serviceId, slotId },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setMessage(`Booking confirmed. Token: ${res.data.bookingToken}`);
      setStep(3);
    } catch {
      setError("Unable to create booking right now. Try another slot.");
    } finally {
      setLoading(false);
    }
  };

  const selectedService = services.find((service) => service.id === serviceId);
  const selectedSlot = slots.find((slot) => slot.id === slotId);

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <form onSubmit={submit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900 lg:col-span-2">
        <h2 className="text-xl font-semibold">Book a Slot</h2>
        <div className="flex gap-2 text-xs font-semibold">
          {[1, 2, 3].map((value) => (
            <span
              key={value}
              className={`rounded-full px-3 py-1 ${step >= value ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"}`}
            >
              Step {value}
            </span>
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">1. Select service</p>
          <select
            value={serviceId}
            onChange={(e) => {
              setServiceId(e.target.value);
              setStep(2);
            }}
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base dark:border-slate-700 dark:bg-slate-900"
          >
            <option value="">Select service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">2. Choose time slot</p>
          <select
            value={slotId}
            onChange={(e) => {
              setSlotId(e.target.value);
              if (e.target.value) setStep(3);
            }}
            disabled={!serviceId || slotsLoading || slots.length === 0}
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900"
          >
            <option value="">
              {slotsLoading
                ? "Loading slots..."
                : !serviceId
                  ? "Select a service first"
                  : slots.length === 0
                    ? "No slots available"
                    : "Select time slot"}
            </option>
            {slots.map((slot) => (
              <option key={slot.id} value={slot.id}>
                {new Date(slot.startTime).toLocaleString()} ({slot.booked}/{slot.capacity})
              </option>
            ))}
          </select>
          {serviceId && !slotsLoading && slots.length === 0 ? (
            <Card className="text-sm text-slate-500">No available slots for this service yet. Please try another service or ask admin to create slots.</Card>
          ) : null}
        </div>
        <Button type="submit" disabled={!serviceId || !slotId || loading}>
          {loading ? "Confirming..." : "Confirm Booking"}
        </Button>
        {error ? <p className="text-sm font-semibold text-rose-600">{error}</p> : null}
        {message ? <p className="text-sm font-semibold text-emerald-700">{message}</p> : null}
      </form>
      <BookingSummaryCard service={selectedService} slot={selectedSlot} />
    </div>
  );
}
