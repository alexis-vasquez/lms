import { LayoutType } from "@/components/Layout";
import { privatePage } from "@/router";
import { NextPageWithLayout } from "./_app";

const Dashboard: NextPageWithLayout = () => {
  return <h1>Dashboard</h1>;
};

Dashboard.layout = LayoutType.DASHBOARD;

export default privatePage(Dashboard);
