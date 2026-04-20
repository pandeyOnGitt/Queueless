"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { setRoleId, setToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthSplitLayout } from "@/components/auth-split-layout";

export default function LoginPage() {
  const router = useRouter();
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
      const res = await api.post("/auth/login", { email, password });
      setToken(res.data.accessToken);
      setRoleId(res.data.user.roleId);
      setMessage("Login successful. Redirecting...");
      router.push(res.data.user.roleId === 1 ? "/admin" : "/dashboard");
    } catch {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthSplitLayout
      title="Welcome back"
      subtitle="Sign in to manage bookings, track live queues, and access your QueueLess dashboard."
    >
      <form onSubmit={submit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-semibold">Email address</label>
          <Input placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold">Password</label>
          <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </Button>
        {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}
        <p className="text-sm text-slate-500">
          New here?{" "}
          <Link href="/register" className="font-semibold text-indigo-600">
            Create account
          </Link>
        </p>
        {message ? <p className="text-sm font-medium text-emerald-600">{message}</p> : null}
      </form>
    </AuthSplitLayout>
  );
}
