import AdminProtected from "@/components/admin/AdminProtected";

export default function ProtectedAdminLayout({ children }) {
  return <AdminProtected>{children}</AdminProtected>;
}
