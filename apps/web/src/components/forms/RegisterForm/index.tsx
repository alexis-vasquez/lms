import {
  Alert,
  Button,
  Checkbox,
  Form,
  Input,
  LockOutlined,
  UserOutlined,
} from "@romalms/design-system";
import { css } from "@emotion/react";
import { useAuthContext } from "@/context/AuthContext";
import { useAuthService } from "@/services/AuthService";

export type RegisterFormValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  remember: boolean;
};

const styles = {
  form: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    maxWidth: 500,
    width: "100%",
    padding: 20,
    marginTop: 20,
  }),
  errorMessage: css({
    marginBottom: 20,
  }),
};

export const RegisterForm = () => {
  const AuthService = useAuthService();
  const [mutate, { loading, error }] = AuthService.useRegisterMutation();
  // const { mutate, error } = useMutation(AuthService.register);
  const { setToken } = useAuthContext();
  const [form] = Form.useForm();

  const handleSubmit = (values: RegisterFormValues) => {
    const { remember, ...userData } = values;
    mutate({
      variables: { input: userData },
      onCompleted: ({ auth }) => {
        setToken(auth.token, remember);
      },
      onError: () => {
        form.setFieldValue("password", "");
      },
    });
  };

  const initialValues: RegisterFormValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    remember: true,
  };

  return (
    <Form
      name="normal_register"
      className="register-form"
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
            message: "Please input your Email!",
            type: "email",
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="firstName"
        label="First name"
        rules={[
          {
            required: true,
            message: "Please input your first name!",
            type: "string",
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="First name" />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Last name"
        rules={[
          {
            required: true,
            message: "Please input your last name!",
            type: "string",
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Last name" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
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
          <Checkbox name="Remember me">Keep me signed in</Checkbox>
        </Form.Item>
      </Form.Item>
      {error?.message && (
        <Alert
          message={error.message}
          type="error"
          showIcon
          css={styles.errorMessage}
        />
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};
