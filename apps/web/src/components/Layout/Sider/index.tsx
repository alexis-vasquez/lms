import {
  AppstoreOutlined,
  Layout,
  Menu,
  ReadOutlined,
} from "@romalms/design-system";
import { useRouter } from "next/router";
import { useState } from "react";

export const Sider = () => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      defaultCollapsed
    >
      <Menu
        selectedKeys={[router.pathname]}
        activeKey={router.pathname}
        theme="dark"
        mode="inline"
        items={[
          {
            label: "Dashboard",
            icon: <AppstoreOutlined />,
            key: "/",
            onClick: () => router.push("/", undefined, { shallow: true }),
          },
          {
            label: "Courses",
            icon: <ReadOutlined />,
            onClick: () =>
              router.push("/courses", undefined, { shallow: true }),
            key: "/courses",
          },
          {
            label: "State Check",
            key: 3,
            icon: <ReadOutlined />,
          },
          {
            label: "Profile",
            key: "/profile",
            onClick: () =>
              router.push("/profile", undefined, { shallow: true }),
          },
        ]}
      />
    </Layout.Sider>
  );
};
