import { Sparkles, Timer } from "lucide-react";

export function AuthSplitLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-[calc(100vh-120px)] overflow-hidden rounded-3xl border border-slate-200 bg-white/80 dark:bg-slate-900/70 lg:grid-cols-2">
      <section className="hidden flex-col justify-between bg-gradient-to-br from-indigo-600 to-violet-600 p-10 text-white lg:flex">
        <div className="space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            QueueLess
          </p>
          <h1 className="text-4xl font-bold leading-tight">Smart queue prediction for faster, calmer service experience.</h1>
          <p className="max-w-md text-sm text-indigo-100">
            Monitor queue load in real time, reserve slots in advance, and reduce crowding across offices, hospitals, and banks.
          </p>
        </div>
        <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
          <p className="inline-flex items-center gap-2 text-sm font-semibold">
            <Timer className="h-4 w-4" />
            Real-time intelligence
          </p>
          <p className="mt-1 text-sm text-indigo-100">Accurate wait estimation and token tracking on every service counter.</p>
        </div>
      </section>
      <section className="flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-xl space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
          </div>
          {children}
        </div>
      </section>
    </div>
  );
}
