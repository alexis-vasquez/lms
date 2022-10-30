import { LayoutType } from "@/components/Layout";
import { privatePage } from "@/router";
import { NextPageWithLayout } from "./_app";
import { useAuthContext } from "@/context/AuthContext";
import { AdminDashboard } from "@/components/pages/dashboard/AdminDashboard";
import { StudentsDashboard } from "@/components/pages/dashboard/StudentsDashboard";

const Dashboard: NextPageWithLayout = () => {
  const { user } = useAuthContext();

  const isAdmin = user?.role === "superadmin";

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return <StudentsDashboard />;
};

Dashboard.layout = LayoutType.DASHBOARD;

export default privatePage(Dashboard);
