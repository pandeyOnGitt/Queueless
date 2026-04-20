"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BellRing, CalendarClock } from "lucide-react";
import { isAdminRole } from "@/lib/auth";
import { ModeToggle } from "@/components/mode-toggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/services", label: "Services" },
  { href: "/book-slot", label: "Book Slot" },
  { href: "/bookings", label: "My Bookings" },
  { href: "/live-queue", label: "Live Queue" },
];

const adminLinks = [
  { href: "/admin", label: "Admin" },
  { href: "/admin/users", label: "Admin Users" },
  { href: "/admin/services", label: "Admin Services" },
  { href: "/admin/queue", label: "Admin Queue" },
  { href: "/admin/slots", label: "Admin Slots" },
];

export function Navbar() {
  const pathname = usePathname();
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    setAdmin(isAdminRole());
  }, []);

  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200/70 glass">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-slate-100">
          <span className="rounded-lg bg-indigo-600 p-1.5 text-white">
            <CalendarClock className="h-4 w-4" />
          </span>
          QueueLess
        </Link>
        {isAuthPage ? (
          <ModeToggle />
        ) : (
          <>
            <div className="hidden flex-wrap items-center gap-3 text-sm md:flex">
              {[...links, ...(admin ? adminLinks : [])].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-md px-2 py-1 text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                  {link.label}
                </Link>
              ))}
              <Link href="/login" className="rounded-md px-3 py-1.5 text-slate-700 hover:bg-slate-100">
                Login
              </Link>
              <Link href="/register" className="rounded-md bg-indigo-600 px-3 py-1.5 font-semibold text-white hover:bg-indigo-500">
                Get Started
              </Link>
              <ModeToggle />
            </div>
            <div className="flex items-center gap-2 md:hidden">
              <BellRing className="h-4 w-4 text-slate-500" />
              <ModeToggle />
              <Link href="/services" className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white">
                Open App
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
