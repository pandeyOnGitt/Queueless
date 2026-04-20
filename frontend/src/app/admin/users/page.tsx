"use client";

import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { getToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

type AdminUser = {
  id: string;
  fullName: string;
  email: string;
  roleId: number;
  isActive: boolean;
  createdAt: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [query, setQuery] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("2");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadUsers = async () => {
    const token = getToken();
    const res = await api.get("/admin/users", {
      params: query ? { search: query } : undefined,
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, [query]);

  const filtered = useMemo(
    () =>
      users.filter(
        (user) =>
          user.email.toLowerCase().includes(query.toLowerCase()) ||
          user.fullName.toLowerCase().includes(query.toLowerCase()),
      ),
    [users, query],
  );

  const toggleStatus = async (user: AdminUser) => {
    const token = getToken();
    await api.patch(
      `/admin/users/${user.id}/status`,
      { isActive: !user.isActive },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    loadUsers();
  };

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getToken();
    setError("");
    setMessage("");
    try {
      await api.post(
        "/admin/users",
        {
          fullName,
          email,
          password,
          roleId: Number(roleId),
          isActive: true,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setMessage("User created successfully.");
      setFullName("");
      setEmail("");
      setPassword("");
      setRoleId("2");
      loadUsers();
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Failed to create user.");
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">User Management</h1>
      <Card>
        <form onSubmit={createUser} className="grid gap-3 md:grid-cols-2">
          <Input placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Temporary password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <select
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-base dark:border-slate-700 dark:bg-slate-900"
          >
            <option value="2">USER</option>
            <option value="1">ADMIN</option>
          </select>
          <div className="md:col-span-2">
            <Button type="submit">Create User</Button>
          </div>
          {message ? <p className="text-sm font-medium text-emerald-600 md:col-span-2">{message}</p> : null}
          {error ? <p className="text-sm font-medium text-rose-600 md:col-span-2">{error}</p> : null}
        </form>
      </Card>
      <Input placeholder="Search by name or email" value={query} onChange={(e) => setQuery(e.target.value)} />
      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[740px] text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.id} className="border-t border-slate-200">
                <td className="px-4 py-3">{user.fullName}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.roleId === 1 ? "ADMIN" : "USER"}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${user.isActive ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  {user.roleId === 1 ? (
                    <span className="text-xs text-slate-500">System admin</span>
                  ) : (
                    <Button
                      type="button"
                      className={user.isActive ? "bg-rose-600 hover:bg-rose-500" : "bg-emerald-600 hover:bg-emerald-500"}
                      onClick={() => toggleStatus(user)}
                    >
                      {user.isActive ? "Deactivate" : "Activate"}
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
