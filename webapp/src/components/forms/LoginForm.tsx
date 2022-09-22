import { useMutation } from '@tanstack/react-query';
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { AuthService } from '@/services/AuthService';
import { useAppContext } from '@/context/AppContext';

type LoginFormValues = {
  email: string;
  password: string;
  remember: boolean;
};

const styles = {
  form: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    maxWidth: 500,
    flexGrow: 1,
    padding: 20,
  })
};

export const LoginForm = () => {
  const { mutate } = useMutation(AuthService.login);
  const { setToken } = useAppContext();
  const [form] = Form.useForm();

  const handleSubmit = (values: LoginFormValues) => {
    const { remember, ...otherValues } = values;
    mutate(otherValues, {
      onSuccess: ({ token }) => {
        setToken(token, remember);
      },
      onError: (error) => {
        // eslint-disable-next-line no-alert
        alert(error);
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
        rules={[{ required: true, message: 'Please input your Email!', type: 'email' }]}
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
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};
