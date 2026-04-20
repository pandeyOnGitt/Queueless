"use client";

import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { QueueStatus } from "@/lib/types";
import { QueueStatusDisplay } from "@/components/queue-status-display";
import { TokenDisplayWidget } from "@/components/token-display-widget";
import { EmptyState } from "@/components/empty-state";

export function LiveQueuePanel() {
  const [events, setEvents] = useState<QueueStatus[]>([]);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  useEffect(() => {
    socket.connect();
    socket.on("queue.updated", (event: QueueStatus) => {
      setEvents((prev) => [event, ...prev].slice(0, 15));
      setUpdatedAt(new Date());
    });
    return () => {
      socket.off("queue.updated");
      socket.disconnect();
    };
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Live Queue Feed</h2>
        <p className="text-xs text-slate-500">{updatedAt ? `Updated ${updatedAt.toLocaleTimeString()}` : "Waiting for updates..."}</p>
      </div>
      {events[0] ? <TokenDisplayWidget token={events[0].currentToken} label="Currently Serving Token" /> : null}
      <div className="space-y-2">
        {events.length === 0 ? (
          <EmptyState title="No live events yet" description="Queue updates will appear automatically once services are updated." />
        ) : (
          events.map((event, index) => <QueueStatusDisplay key={`${event.serviceId}-${index}`} queue={event} />)
        )}
      </div>
    </div>
  );
}
