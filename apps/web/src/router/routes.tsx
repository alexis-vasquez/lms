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
  sideBar?: boolean;
  icon?: ReactElement;
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
  },
  Login: { label: "Login", path: "/login" },
  Profile: { label: "Profile", path: "/profile", icon: <UserOutlined /> },
  Register: { label: "Register", path: "/register" },
};
