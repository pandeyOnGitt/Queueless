"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CalendarClock, LayoutDashboard, LogOut, Shield, Ticket, Timer, Users } from "lucide-react";
import { clearAuth, getRoleId, getToken, isAdminRole } from "@/lib/auth";
import { Navbar } from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";

const userMenu = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/services", label: "Services", icon: Users },
  { href: "/book-slot", label: "Book Slot", icon: Ticket },
  { href: "/bookings", label: "My Bookings", icon: CalendarClock },
  { href: "/live-queue", label: "Live Queue", icon: Timer },
];

const adminMenu = [
  { href: "/admin", label: "Admin Dashboard", icon: Shield },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/services", label: "Services", icon: CalendarClock },
  { href: "/admin/queue", label: "Queue", icon: Timer },
  { href: "/admin/slots", label: "Slots", icon: Ticket },
  { href: "/admin/bookings", label: "Bookings", icon: LayoutDashboard },
];

const publicPaths = ["/", "/login", "/register", "/unauthorized"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const token = getToken();
    setAuthenticated(Boolean(token));
    setAdmin(isAdminRole());
  }, [pathname]);

  const menu = useMemo(() => (admin ? adminMenu : userMenu), [admin]);
  const isPublicPath = publicPaths.includes(pathname);
  const isAuthPage = pathname === "/login" || pathname === "/register";

  useEffect(() => {
    if (!authenticated && !isPublicPath) {
      router.replace("/login");
    }
  }, [authenticated, isPublicPath, router]);

  const logout = () => {
    clearAuth();
    setAuthenticated(false);
    setAdmin(false);
    router.push("/login");
  };

  if (!authenticated || isPublicPath) {
    return (
      <>
        <Navbar />
        <main className={`mx-auto w-full px-4 py-8 md:px-6 ${isAuthPage ? "max-w-[1400px]" : "max-w-7xl"}`}>{children}</main>
      </>
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-[1600px] gap-4 px-3 py-4 md:grid-cols-[280px_1fr] md:px-6">
      <Card className="sticky top-4 h-[calc(100vh-2rem)] space-y-3 overflow-y-auto p-4">
        <Link href={admin ? "/admin" : "/dashboard"} className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
          <span className="rounded-lg bg-indigo-600 p-1.5 text-white">
            <CalendarClock className="h-4 w-4" />
          </span>
          QueueLess
        </Link>
        <div className="flex items-center justify-between rounded-lg bg-slate-50 px-2 py-1.5 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-300">
          <span>{admin ? "Admin Menu" : "User Menu"}</span>
          <ModeToggle />
        </div>
        <div className="space-y-1">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 rounded-lg px-2 py-2 text-sm ${
                pathname === item.href
                  ? "bg-indigo-50 font-semibold text-indigo-700 dark:bg-indigo-600/20 dark:text-indigo-200"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </div>
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold text-white hover:bg-rose-500"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
        <p className="text-center text-xs text-slate-500">Role ID: {getRoleId() || "-"}</p>
      </Card>
      <main className="min-h-[calc(100vh-2rem)] rounded-2xl border border-slate-200 bg-white/70 p-5 dark:border-slate-700 dark:bg-slate-900/60 md:p-8">
        {children}
      </main>
    </div>
  );
}
