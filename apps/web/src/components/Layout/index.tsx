import { useAuthContext } from "@/context/AuthContext";
import { css } from "@emotion/react";
import { Layout } from "@romalms/design-system";
import { PropsWithChildren } from "react";
import { Content } from "./Content";
import { Header } from "./Header";
import { Sider } from "./Sider";

export const LayoutContainer = ({ children }: PropsWithChildren) => {
  return (
    <Layout css={styles.wrapper}>
      <Header />
      <Layout>
        <Sider />
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

const styles = {
  wrapper: css({
    minHeight: "100vh",
  }),
};

export enum LayoutType {
  DASHBOARD = "DASHBOARD",
}

export const LayoutWrapper = ({
  children,
  layout,
}: PropsWithChildren<{ layout?: LayoutType }>) => {
  const { user } = useAuthContext();
  // We check user here to prevent flash of dashboard content
  if (layout === LayoutType.DASHBOARD && user) {
    return <LayoutContainer>{children}</LayoutContainer>;
  }
  return <>{children}</>;
};
