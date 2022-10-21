/* eslint-disable import/no-default-export */
import React from "react";
import { css } from "@emotion/react";
import { LoginForm } from "@/components/forms/LoginForm";
import { AppstoreOutlined, Avatar } from "@romalms/design-system";
import { NextPage } from "next";
import { protectedPage } from "@/router";
import Link from "next/link";

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

const LoginPage: NextPage = () => {
  return (
    <div css={styles.container}>
      <div css={styles.content}>
        <Avatar size={100} icon={<AppstoreOutlined />} />
        <LoginForm />
        <span>
          Don't have an account? <Link href="/register">Register</Link>
        </span>
      </div>
    </div>
  );
};

export default protectedPage(LoginPage);
