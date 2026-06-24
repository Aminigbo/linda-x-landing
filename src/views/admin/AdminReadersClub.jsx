"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow, format } from "date-fns";
import { Trash2, Users, Search } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminReadersClub() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setError("");
      const { data, error: fetchError } = await supabase
        .from("readers_club")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;
      setMembers(data || []);
    } catch (err) {
      console.error("Error fetching readers club members:", err);
      setError(
        err.code === "42P01"
          ? "Readers' Club table not found. Run supabase/readers_club.sql in Supabase."
          : "Failed to load members. Make sure you are logged in as admin."
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteMember = async (id) => {
    if (!confirm("Remove this member from the Readers' Club?")) return;

    try {
      const { error: deleteError } = await supabase
        .from("readers_club")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;
      setMembers((prev) => prev.filter((member) => member.id !== id));
    } catch (err) {
      console.error("Error deleting member:", err);
      alert("Failed to delete member.");
    }
  };

  const filteredMembers = members.filter((member) => {
    const query = search.toLowerCase();
    return (
      member.name?.toLowerCase().includes(query) ||
      member.email?.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return (
      <AdminLayout>
        <div className="page-header">
          <h1 className="page-title">Reader&apos;s Club</h1>
        </div>
        <p>Loading...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="page-header">
        <h1 className="page-title">Reader&apos;s Club</h1>
        <div className="flex items-center gap-2 text-sm text-muted">
          <Users size={16} />
          {members.length} member{members.length === 1 ? "" : "s"}
        </div>
      </div>

      {error ? (
        <div className="form-error" style={{ marginBottom: "var(--space-6)" }}>
          {error}
        </div>
      ) : (
        <>
          <div className="form-group" style={{ maxWidth: 400, marginBottom: "var(--space-6)" }}>
            <div style={{ position: "relative" }}>
              <Search
                size={16}
                style={{
                  position: "absolute",
                  left: "var(--space-3)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--gray-400)",
                }}
              />
              <input
                type="search"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input"
                style={{ paddingLeft: "2.25rem" }}
              />
            </div>
          </div>

          {filteredMembers.length === 0 ? (
            <div className="text-center" style={{ padding: "var(--space-12) 0" }}>
              <h2
                style={{
                  fontSize: "var(--font-size-xl)",
                  color: "var(--gray-600)",
                  marginBottom: "var(--space-4)",
                }}
              >
                {members.length === 0
                  ? "No members yet"
                  : "No members match your search"}
              </h2>
            </div>
          ) : (
            <div className="admin-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member) => (
                    <tr key={member.id}>
                      <td style={{ fontWeight: 600, color: "var(--gray-900)" }}>
                        {member.name}
                      </td>
                      <td>
                        <a
                          href={`mailto:${member.email}`}
                          style={{ color: "var(--primary)" }}
                        >
                          {member.email}
                        </a>
                      </td>
                      <td style={{ fontSize: "var(--font-size-sm)", color: "var(--gray-500)" }}>
                        <div>{format(new Date(member.created_at), "MMM d, yyyy")}</div>
                        <div>
                          {formatDistanceToNow(new Date(member.created_at), {
                            addSuffix: true,
                          })}
                        </div>
                      </td>
                      <td>
                        <button
                          onClick={() => deleteMember(member.id)}
                          className="btn btn-icon btn-danger"
                          title="Remove member"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </AdminLayout>
  );
}
