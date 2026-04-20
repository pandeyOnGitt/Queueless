import { LiveQueuePanel } from "@/components/live-queue-panel";

export default function LiveQueuePage() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold">Live Queue Tracker</h1>
      <p className="text-sm text-slate-500">Monitor real-time queue movement, token progression, and waiting-time updates.</p>
      <LiveQueuePanel />
    </div>
  );
}
