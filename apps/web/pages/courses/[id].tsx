import { LayoutType } from "@/components/Layout";
import { privatePage } from "@/router";
import { NextPageWithLayout } from "../_app";

const SingleCourse: NextPageWithLayout = () => {
  return <h1>Single Course</h1>;
};

SingleCourse.layout = LayoutType.DASHBOARD;

export default privatePage(SingleCourse);
