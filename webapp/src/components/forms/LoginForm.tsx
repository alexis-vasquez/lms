import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/services/AuthService';
import { useAppContext } from '@/context/AppContext';

export const LoginForm = () => {
  const { mutate } = useMutation(AuthService.login);
  const { setToken } = useAppContext();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const formik = useFormik({
    validationSchema,
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: ({ token }) => {
          setToken(token);
        },
        onError: (error) => {
          // eslint-disable-next-line no-alert
          alert(error);
          formik.setValues((oldValues) => ({ ...oldValues, password: '' }));
        },
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
};
