import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: Props) {
  return (
    <div
      className={cn(
        "surface rounded-2xl border border-slate-200/80 p-6 shadow-[0_10px_35px_-18px_rgba(15,23,42,0.35)] dark:border-slate-700/80",
        className,
      )}
      {...props}
    />
  );
}
