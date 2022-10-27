import { LayoutType } from "@/components/Layout";
import { privatePage } from "@/router";
import { NextPageWithLayout } from "../_app";

const CreateCourse: NextPageWithLayout = () => {
  return <h1>CreateCourse</h1>;
};

CreateCourse.layout = LayoutType.DASHBOARD;

export default privatePage(CreateCourse);
