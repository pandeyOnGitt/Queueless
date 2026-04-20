import Link from "next/link";
import { ShieldX } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function UnauthorizedPage() {
  return (
    <Card className="mx-auto max-w-lg space-y-3 text-center">
      <ShieldX className="mx-auto h-8 w-8 text-rose-500" />
      <h1 className="text-2xl font-bold">Access Denied</h1>
      <p className="text-sm text-slate-500">You do not have permission to access this page.</p>
      <Link href="/dashboard" className="text-sm font-semibold text-indigo-600">
        Go to Dashboard
      </Link>
    </Card>
  );
}
