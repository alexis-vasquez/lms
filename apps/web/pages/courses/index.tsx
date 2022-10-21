import { LayoutType } from "@/components/Layout";
import { privatePage } from "@/router";
import { NextPageWithLayout } from "../_app";

const Courses: NextPageWithLayout = () => {
  return <h1>Courses</h1>;
};

Courses.layout = LayoutType.DASHBOARD;

export default privatePage(Courses);
