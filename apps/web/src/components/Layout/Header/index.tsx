import { useAuthContext } from "@/context/AuthContext";
import { Routes } from "@/router";
import { css } from "@emotion/react";
import {
  Avatar,
  Dropdown,
  Layout,
  LogoutOutlined,
  Menu,
  Typography,
} from "@romalms/design-system";
import Link from "next/link";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();
  const { setToken, user } = useAuthContext();

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
      <div css={{ display: "flex", gap: 8 }}>
        <Dropdown
          overlay={menu}
          trigger={["click"]}
          overlayStyle={{ minWidth: 200 }}
          arrow
          placement="bottom"
        >
          <Avatar
            src="https://joeschmoe.io/api/v1/random"
            css={{ cursor: "pointer" }}
          />
        </Dropdown>
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography.Text css={{ color: "white", lineHeight: "16px" }} strong>
            {user?.firstName} {user?.lastName}
          </Typography.Text>
          <Typography.Text css={{ color: "white", lineHeight: "16px" }}>
            {user?.role}
          </Typography.Text>
        </div>
      </div>
    </Layout.Header>
  );
};

const styles = {
  wrapper: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 24px",
  }),
};
