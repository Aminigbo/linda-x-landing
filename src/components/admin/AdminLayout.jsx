"use client";

import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children, rightSidebar }) {
  const hasRightSidebar = !!rightSidebar;

  return (
    <div className="page">
      <style>{`
        .admin-layout {
          display: grid;
          grid-template-columns: ${hasRightSidebar ? "250px 1fr 280px" : "250px 1fr"};
          gap: var(--space-8);
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 var(--space-4);
          min-height: 100vh;
        }

        .admin-main {
          min-width: 0;
        }

        .admin-right-sidebar {
          position: sticky;
          top: var(--space-8);
          height: fit-content;
        }

        @media (max-width: 1200px) {
          .admin-layout {
            grid-template-columns: ${hasRightSidebar ? "200px 1fr 250px" : "250px 1fr"};
          }
        }

        @media (max-width: 1024px) {
          .admin-layout {
            grid-template-columns: 1fr;
            gap: var(--space-6);
          }

          .admin-right-sidebar {
            position: static;
            order: 3;
          }
        }
      `}</style>

      <div className="admin-layout">
        <AdminSidebar />
        <main className="admin-main fade-in">{children}</main>
        {hasRightSidebar && (
          <aside className="admin-right-sidebar">{rightSidebar}</aside>
        )}
      </div>
    </div>
  );
}
