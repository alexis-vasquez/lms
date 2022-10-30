import { CourseTabsEnum } from "@/components/pages/courses/CoursesTabs";
import {
  AppstoreOutlined,
  ReadOutlined,
  UserOutlined,
} from "@romalms/design-system";
import { ReactElement } from "react";

enum RoutesKeys {
  Courses = "Courses",
  Dashboard = "Dashboard",
  Login = "Login",
  Profile = "Profile",
  Register = "Register",
}

type Route = {
  label: string;
  path: string;
  query?: string;
  sideBar?: boolean;
  icon?: ReactElement;
  children?: Omit<Route, "children">[];
};

export const Routes: Record<RoutesKeys, Route> = {
  Dashboard: {
    label: "Home",
    path: "/",
    sideBar: true,
    icon: <AppstoreOutlined />,
  },
  Courses: {
    label: "Courses",
    path: "/courses",
    sideBar: true,
    icon: <ReadOutlined />,
    children: [
      {
        label: "All Courses",
        path: "/courses",
        query: new URLSearchParams({
          status: CourseTabsEnum.AllCourses,
        }).toString(),
      },
      {
        label: "Active Courses",
        path: "/courses",
        query: new URLSearchParams({
          status: CourseTabsEnum.Active,
        }).toString(),
      },
      {
        label: "Upcoming Courses",
        path: "/courses",
        query: new URLSearchParams({
          status: CourseTabsEnum.Upcoming,
        }).toString(),
      },
      {
        label: "Completed Courses",
        path: "/courses",
        query: new URLSearchParams({
          status: CourseTabsEnum.Completed,
        }).toString(),
      },
    ],
  },
  Login: { label: "Login", path: "/login" },
  Profile: { label: "Profile", path: "/profile", icon: <UserOutlined /> },
  Register: { label: "Register", path: "/register" },
};
