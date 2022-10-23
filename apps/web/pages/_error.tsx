import { LayoutType } from "@/components/Layout";
import { NextPageWithLayout } from "./_app";

const NotFoundPage: NextPageWithLayout = () => {
  return <h1>404</h1>;
};

NotFoundPage.layout = LayoutType.DASHBOARD;

export default NotFoundPage;
