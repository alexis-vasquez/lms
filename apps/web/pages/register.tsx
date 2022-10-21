import { RegisterForm } from "@/components/forms/RegisterForm";
import { css } from "@emotion/react";
import { AppstoreOutlined, Avatar } from "@romalms/design-system";
import { NextPage } from "next";
import Link from "next/link";
import { protectedPage } from "@/router";

const styles = {
  container: css({
    backgroundPosition: "center",
    height: "100vh",
    padding: 20,
  }),
  content: css({
    background: "rgba(255, 255, 255, 0.18)",
    borderRadius: 16,
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(5.9px)",
    WebkitBackdropFilter: "blur(5.9px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  }),
};

const RegisterPage: NextPage = () => {
  return (
    <div css={styles.container}>
      <div css={styles.content}>
        <Avatar size={100} icon={<AppstoreOutlined />} />
        <RegisterForm />
        <span>
          Already signed in? <Link href="/login">Login</Link>
        </span>
      </div>
    </div>
  );
};

export default protectedPage(RegisterPage);
