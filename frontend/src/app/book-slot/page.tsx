import { BookingForm } from "@/components/booking-form";

export default function BookSlotPage() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold">Slot Booking</h1>
      <p className="text-sm text-slate-500">Select your service, pick an available slot, and confirm in a guided flow.</p>
      <BookingForm />
    </div>
  );
}
