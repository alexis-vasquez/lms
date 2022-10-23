import { LayoutType } from "@/components/Layout";
import { privatePage } from "@/router";
import { NextPageWithLayout } from "./_app";

const Profile: NextPageWithLayout = () => {
  return <h1>Profile</h1>;
};

Profile.layout = LayoutType.DASHBOARD;

export default privatePage(Profile);
