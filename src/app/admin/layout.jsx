import "./admin.css";

export const metadata = {
  title: {
    default: "Admin",
    template: "%s | Admin",
  },
};

export default function AdminRootLayout({ children }) {
  return <div className="admin-app">{children}</div>;
}
