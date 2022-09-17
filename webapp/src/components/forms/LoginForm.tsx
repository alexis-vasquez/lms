import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLoginMutation } from '~/services/AuthService';

export const LoginForm = () => {
  const { mutate } = useLoginMutation();

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
      mutate(values);
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
