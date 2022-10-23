import { useAuthContext } from "@/context/AuthContext";
import { css } from "@emotion/react";
import { Avatar, Dropdown, Image, Layout, Menu } from "@romalms/design-system";
import Link from "next/link";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();
  const { setToken } = useAuthContext();

  const menu = (
    <Menu
      items={[
        {
          key: "profile",
          label: "Profile",
          onClick: () => router.push("/profile", undefined, { shallow: true }),
        },
        {
          key: "logout",
          label: "Logout",
          onClick: () => {
            setToken(null);
            router.push("/login");
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
        trigger={["hover"]}
        overlayStyle={{ minWidth: 300 }}
        arrow
        placement="bottomRight"
      >
        <Avatar
          src={
            <Image src="https://joeschmoe.io/api/v1/random" alt="User avatar" />
          }
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
