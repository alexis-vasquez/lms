/* eslint-disable import/no-default-export */
import { css } from '@emotion/react';
import { LoginForm } from '@/components/forms/LoginForm';

const styles = {
  container: css({
    backgroundColor: 'lightgray',
    height: '100vh',
    padding: 20,
  }),
  content: css({
    background: 'rgba(255, 255, 255, 0.18)',
    borderRadius: 16,
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(5.9px)',
    WebkitBackdropFilter: 'blur(5.9px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  }),
};

const LoginPage = () => {
  return (
    <div css={styles.container}>
      <div css={styles.content}>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
