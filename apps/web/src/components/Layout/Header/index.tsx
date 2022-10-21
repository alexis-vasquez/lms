import { css } from "@emotion/react";
import { Avatar, Image, Layout } from "@romalms/design-system";
import Link from "next/link";

export const Header = () => {
  return (
    <Layout.Header css={styles.wrapper}>
      <Link href="/">LMS</Link>
      <Avatar
        src={
          <Image src="https://joeschmoe.io/api/v1/random" alt="User avatar" />
        }
      />
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
