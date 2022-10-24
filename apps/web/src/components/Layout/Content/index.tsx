import { css } from "@emotion/react";
import { Layout } from "@romalms/design-system";
import { PropsWithChildren } from "react";
import { Breadcrumbs } from "./Breadcrumbs";

export const Content = ({ children }: PropsWithChildren) => {
  return (
    <Layout css={styles.wrapper}>
      <Breadcrumbs />
      <Layout.Content css={styles.content}>{children}</Layout.Content>
    </Layout>
  );
};

const styles = {
  wrapper: css({
    minHeight: "100%",
    padding: "0 20px 20px",
  }),
  content: css({
    background: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
};
