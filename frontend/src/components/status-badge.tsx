import { cn } from "@/lib/utils";

type Props = {
  value: "OPEN" | "BUSY" | "CLOSED" | string;
};

export function StatusBadge({ value }: Props) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
        value === "OPEN" && "bg-emerald-100 text-emerald-700",
        value === "BUSY" && "bg-amber-100 text-amber-700",
        value === "CLOSED" && "bg-slate-200 text-slate-700",
      )}
    >
      {value}
    </span>
  );
}
