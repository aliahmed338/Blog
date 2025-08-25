import type { Metadata } from "next";
import DashboardNav from "./dashboard-nav";

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "this is admin dashboard",
};

const AdminDahboardLayout = ({ children }: AdminDashboardLayoutProps) => {
  return (
    <div>
      <DashboardNav />
      <div>{children}</div>
    </div>
  );
};

export default AdminDahboardLayout;
