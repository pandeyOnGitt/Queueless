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

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">User Management</h1>
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
