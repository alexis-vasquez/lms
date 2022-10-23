import { css } from "@emotion/react";
import { Breadcrumb, Layout } from "@romalms/design-system";
import { PropsWithChildren } from "react";

export const Content = ({ children }: PropsWithChildren) => {
  return (
    <Layout css={styles.wrapper}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
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
