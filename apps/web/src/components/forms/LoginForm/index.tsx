import { useMutation } from '@tanstack/react-query';
import { Alert, Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { AxiosError } from 'axios';
import { useAuthService } from '@/services/AuthService';
import { useErrorMessage } from '@/hooks/useErrorMessage';
import { useAuthContext } from '@/context/AuthContext';

export type LoginFormValues = {
  email: string;
  password: string;
  remember: boolean;
};

const styles = {
  form: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: 500,
    width: '100%',
    padding: 20,
    marginTop: 20,
  }),
  errorMessage: css({
    marginBottom: 20,
  }),
};

export const LoginForm = () => {
  const AuthService = useAuthService();
  const { mutate, error } = useMutation(AuthService.login);
  const errorMessage = useErrorMessage(error as AxiosError<{ error: string }>);
  const { setToken } = useAuthContext();
  const [form] = Form.useForm();

  const handleSubmit = (values: LoginFormValues) => {
    const { remember, ...emailAndPassword } = values;
    mutate(emailAndPassword, {
      onSuccess: ({ token }) => {
        setToken(token, remember);
      },
      onError: () => {
        form.setFieldValue('password', '');
      },
    });
  };

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
    remember: true,
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={initialValues}
      onFinish={handleSubmit}
      scrollToFirstError
      form={form}
      layout="vertical"
      css={styles.form}
    >
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
            type: 'email',
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
          role="textbox"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox name="Remember me">Remember me</Checkbox>
        </Form.Item>
      </Form.Item>
      {errorMessage && (
        <Alert
          message={errorMessage}
          type="error"
          showIcon
          css={styles.errorMessage}
        />
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};
