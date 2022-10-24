import { useAuthContext } from "@/context/AuthContext";
import { Routes } from "@/router";
import { css } from "@emotion/react";
import {
  Avatar,
  Dropdown,
  Layout,
  LogoutOutlined,
  Menu,
} from "@romalms/design-system";
import Link from "next/link";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();
  const { setToken } = useAuthContext();

  const menu = (
    <Menu
      items={[
        {
          key: Routes.Profile.path,
          label: Routes.Profile.label,
          onClick: () => router.push(Routes.Profile.path),
          icon: Routes.Profile.icon,
        },
        {
          key: "logout",
          label: "Logout",
          icon: <LogoutOutlined />,
          onClick: () => {
            setToken(null);
            router.push(Routes.Login.path);
          },
        },
      ]}
    />
  );

  return (
    <Layout.Header css={styles.wrapper}>
      <Link href="/">LMS</Link>
      <Dropdown
        overlay={menu}
        trigger={["click"]}
        overlayStyle={{ minWidth: 300 }}
        arrow
        placement="bottomRight"
      >
        <Avatar
          src="https://joeschmoe.io/api/v1/random"
          css={{ cursor: "pointer" }}
        />
      </Dropdown>
    </Layout.Header>
  );
};

const styles = {
  wrapper: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }),
};
