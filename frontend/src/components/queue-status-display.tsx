import { Card } from "@/components/ui/card";
import { QueueStatus } from "@/lib/types";

type Props = {
  queue: QueueStatus;
  title?: string;
};

export function QueueStatusDisplay({ queue, title }: Props) {
  return (
    <Card className="space-y-1">
      {title ? <h3 className="text-base font-semibold">{title}</h3> : null}
      <p className="text-sm">Service ID: {queue.serviceId}</p>
      <p className="text-sm">People Ahead: {Math.max(queue.currentQueueLength - 1, 0)}</p>
      <p className="text-sm">Queue Length: {queue.currentQueueLength}</p>
      <p className="text-sm">Current Token: {queue.currentToken}</p>
      <p className="text-sm">Avg Service Time: {queue.avgServiceTime} min</p>
      <p className="text-sm font-medium">Estimated Wait: {queue.estimatedWaitingTime} min</p>
      <p className="text-sm">Status: {queue.status}</p>
    </Card>
  );
}
