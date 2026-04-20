"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { setRoleId, setToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthSplitLayout } from "@/components/auth-split-layout";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/register", { fullName, email, password });
      setToken(res.data.accessToken);
      setRoleId(res.data.user.roleId);
      setMessage("Registration successful. Redirecting...");
      router.push(res.data.user.roleId === 1 ? "/admin" : "/dashboard");
    } catch {
      setError("Could not create account. Please check the details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthSplitLayout
      title="Create your account"
      subtitle="Register to reserve time slots, avoid queues, and monitor your bookings live."
    >
      <form onSubmit={submit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-semibold">Full name</label>
          <Input placeholder="Your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold">Email</label>
          <Input placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold">Password</label>
          <Input type="password" placeholder="Create a secure password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating account..." : "Create Account"}
        </Button>
        {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}
        <p className="text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-indigo-600">
            Login
          </Link>
        </p>
        {message ? <p className="text-sm font-medium text-emerald-600">{message}</p> : null}
      </form>
    </AuthSplitLayout>
  );
}
