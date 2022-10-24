import { Routes } from "@/router";
import { Layout, Menu } from "@romalms/design-system";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

export const Sider = () => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const sidebarRoutes = useMemo(() => {
    return Object.values(Routes)
      .filter((route) => route.sideBar)
      .map(({ label, icon, path }) => ({
        label,
        icon,
        onClick: () => router.push(path),
        key: path,
      }));
  }, [router]);

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
        items={sidebarRoutes}
      />
    </Layout.Sider>
  );
};
