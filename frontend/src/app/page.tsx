import Link from "next/link";
import { ArrowRight, Building2, Clock3, ShieldCheck, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-600 to-blue-500 p-8 text-white shadow-xl md:grid-cols-2 md:p-12">
        <div className="space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold tracking-wide">
            <Sparkles className="h-3.5 w-3.5" />
            Smart Queue Intelligence
          </p>
          <h1 className="text-3xl font-bold leading-tight md:text-5xl">Skip the line. Predict the wait. Book with confidence.</h1>
          <p className="text-sm text-indigo-100 md:text-base">
            QueueLess helps students, patients, and customers avoid long queues with accurate waiting-time prediction and live
            token updates.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/book-slot">
              <Button className="bg-white text-indigo-700 hover:bg-indigo-50">
                Book a Slot <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/live-queue">
              <Button className="bg-indigo-500/40 text-white hover:bg-indigo-400/50">Track Live Queue</Button>
            </Link>
          </div>
        </div>
        <Card className="space-y-3 bg-white/95 text-slate-900">
          <h2 className="text-lg font-semibold">Today at a glance</h2>
          <p className="text-sm text-slate-500">See queue health across campuses, hospitals, banks, and canteens.</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Avg wait</p>
              <p className="text-xl font-bold">12 min</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Active services</p>
              <p className="text-xl font-bold">27</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Booked today</p>
              <p className="text-xl font-bold">542</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs text-slate-500">On-time slots</p>
              <p className="text-xl font-bold">94%</p>
            </div>
          </div>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { title: "Instant Prediction", text: "Estimate waiting time with live queue length and service speed.", icon: Clock3 },
          { title: "Trusted Operations", text: "Role-based admin controls with secure booking workflows.", icon: ShieldCheck },
          { title: "Multi-service Ready", text: "Support offices, hospitals, banks, and canteens in one app.", icon: Building2 },
        ].map((item) => (
          <Card key={item.title} className="space-y-2">
            <item.icon className="h-5 w-5 text-indigo-600" />
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-slate-600">{item.text}</p>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { service: "College Certificates", wait: "16 min", queue: 8, status: "OPEN" },
          { service: "Hospital OPD", wait: "24 min", queue: 12, status: "BUSY" },
          { service: "Bank KYC Desk", wait: "10 min", queue: 5, status: "OPEN" },
        ].map((item) => (
          <Card key={item.service} className="space-y-1">
            <p className="font-semibold">{item.service}</p>
            <p className="text-sm text-slate-500">Queue: {item.queue} people</p>
            <p className="text-sm text-slate-500">Predicted wait: {item.wait}</p>
            <p className="text-xs font-semibold text-indigo-600">{item.status}</p>
          </Card>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
        <p className="text-sm text-slate-500">Trusted by campus admins, healthcare desks, and public service counters.</p>
      </section>
    </div>
  );
}
