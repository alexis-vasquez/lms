import { Routes } from "@/router";
import { css } from "@emotion/react";
import { Layout, Menu } from "@romalms/design-system";
import { useRouter } from "next/router";

export const Sider = () => {
  const router = useRouter();

  const sidebarRoutes = Object.values(Routes)
    .filter((route) => route.sideBar)
    .map(({ label, icon, path, children }) => ({
      label,
      icon,
      onClick: children ? undefined : () => router.push(path),
      key: path,
      children: children?.map(({ label, path, query }) => ({
        label,
        onClick: () => router.push({ query, pathname: path }),
      })),
    }));

  return (
    <Layout.Sider collapsible defaultCollapsed>
      <Menu
        css={styles.menu}
        selectedKeys={[router.pathname]}
        activeKey={router.pathname}
        theme="dark"
        mode="inline"
        items={sidebarRoutes}
      />
    </Layout.Sider>
  );
};

const styles = {
  menu: css({
    "& > li": {
      marginTop: "0px !important",
    },
  }),
};
