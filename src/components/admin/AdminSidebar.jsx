"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  PenTool,
  FileText,
  Settings,
  LogOut,
  Facebook,
  Youtube,
  Users,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path) => {
    if (path === "/admin" && pathname === "/admin") return true;
    if (path !== "/admin" && pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <>
      <style>{`
        .admin-sidebar {
          position: sticky;
          top: var(--space-8);
          height: fit-content;
          width: 250px;
          background-color: white;
          border-radius: var(--radius-lg);
          padding: var(--space-6);
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--gray-200);
          z-index: 10;
        }

        .sidebar-nav {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .sidebar-nav li {
          margin-bottom: var(--space-2);
        }

        .sidebar-nav a {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3) var(--space-4);
          color: var(--gray-600);
          text-decoration: none;
          border-radius: var(--radius-md);
          font-size: var(--font-size-sm);
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .sidebar-nav a:hover {
          background-color: var(--gray-100);
          color: var(--gray-900);
        }

        .sidebar-nav a.active {
          background-color: grey;
          color: white;
        }

        @media (max-width: 1024px) {
          .admin-sidebar {
            position: static;
            width: 100%;
            margin-bottom: var(--space-6);
          }
        }
      `}</style>

      <aside className="admin-sidebar">
        <h3
          style={{
            fontSize: "var(--font-size-lg)",
            fontWeight: "600",
            marginBottom: "var(--space-4)",
            color: "var(--gray-900)",
          }}
        >
          Admin Panel
        </h3>

        <nav>
          <ul className="sidebar-nav">
            <li>
              <Link href="/admin" className={isActive("/admin") ? "active" : ""}>
                <BarChart3 size={16} />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/new-post"
                className={isActive("/admin/new-post") ? "active" : ""}
              >
                <PenTool size={16} />
                Publish
              </Link>
            </li>
            <li>
              <Link
                href="/admin/youtube-videos"
                className={isActive("/admin/youtube-videos") ? "active" : ""}
              >
                <Youtube color="red" size={16} />
                YouTube
              </Link>
            </li>
            <li>
              <Link
                href="/admin/articles"
                className={isActive("/admin/articles") ? "active" : ""}
              >
                <FileText size={16} />
                Stories
              </Link>
            </li>
            <li>
              <Link
                href="/admin/readers-club"
                className={isActive("/admin/readers-club") ? "active" : ""}
              >
                <Users size={16} />
                Reader&apos;s Club
              </Link>
            </li>
            <li>
              <a
                href="https://web.facebook.com/profile.php?id=100095289871273"
                target="_blank"
                rel="noopener noreferrer"
                className={isActive("/admin/facebook-page") ? "active" : ""}
              >
                <Facebook color="blue" size={16} />
                Facebook Page
              </a>
            </li>
            <li>
              <Link
                href="/admin/settings"
                className={isActive("/admin/settings") ? "active" : ""}
              >
                <Settings size={16} />
                Settings
              </Link>
            </li>
            <li>
              <a href="#" onClick={handleLogout} className="">
                <LogOut size={16} />
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
