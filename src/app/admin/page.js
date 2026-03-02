"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (status === "authenticated" && session?.user?.role !== "ADMIN") {
      router.push("/dashboard");
      return;
    }
    if (status === "authenticated" && session?.user?.role === "ADMIN") {
      fetchUsers();
    }
  }, [status, session, router]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!session || session.user.role !== "ADMIN") return null;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Admin Panel
          </span>
        </h1>
        <p className="text-base-content/60 mt-1">Manage all registered users</p>
      </div>

      {error && (
        <div role="alert" className="alert alert-error mb-6">
          <span>⚠️ {error}</span>
        </div>
      )}

      {/* Stats */}
      <div className="stats stats-vertical md:stats-horizontal shadow w-full mb-8 bg-base-200">
        <div className="stat">
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-primary">{users.length}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Admins</div>
          <div className="stat-value text-warning">{users.filter((u) => u.role === "ADMIN").length}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Users</div>
          <div className="stat-value text-secondary">{users.filter((u) => u.role === "USER").length}</div>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto rounded-xl bg-base-200 shadow-lg">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="bg-primary text-primary-content rounded-full w-9">
                        <span className="text-sm">{user.name?.charAt(0)?.toUpperCase() || "?"}</span>
                      </div>
                    </div>
                    <span className="font-medium">{user.name || "—"}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge ${user.role === "ADMIN" ? "badge-warning" : "badge-primary"} badge-sm`}>
                    {user.role}
                  </span>
                </td>
                <td className="text-base-content/60">
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
