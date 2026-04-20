import { Booking } from "@/lib/types";

type Props = {
  bookings: Booking[];
};

export function BookingTable({ bookings }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-3 py-2">Service</th>
            <th className="px-3 py-2">Token</th>
            <th className="px-3 py-2">Slot</th>
            <th className="px-3 py-2">Estimated Wait</th>
            <th className="px-3 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-t">
              <td className="px-3 py-2">{booking.service.name}</td>
              <td className="px-3 py-2">{booking.bookingToken}</td>
              <td className="px-3 py-2">{new Date(booking.slot.startTime).toLocaleString()}</td>
              <td className="px-3 py-2">{booking.estimatedWaitTime} min</td>
              <td className="px-3 py-2">{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
