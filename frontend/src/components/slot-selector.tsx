import { Slot } from "@/lib/types";

type Props = {
  slots: Slot[];
  value: string;
  onChange: (id: string) => void;
};

export function SlotSelector({ slots, value, onChange }: Props) {
  return (
    <div className="grid gap-2">
      {slots.map((slot) => (
        <button
          key={slot.id}
          type="button"
          onClick={() => onChange(slot.id)}
          className={`rounded-xl border p-3 text-left text-sm transition ${
            value === slot.id ? "border-indigo-300 bg-indigo-50" : "border-slate-200 bg-white hover:bg-slate-50"
          }`}
        >
          <p className="font-semibold">{new Date(slot.startTime).toLocaleString()}</p>
          <p className="text-slate-500">
            Capacity: {slot.booked}/{slot.capacity}
          </p>
        </button>
      ))}
    </div>
  );
}
