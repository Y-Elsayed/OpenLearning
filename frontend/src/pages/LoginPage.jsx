import { NavLink, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function LoginPage() {
  const navigate = useNavigate();

  const initialValues = { email: '', password: '' };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address!")
      .required("Email is required!"),
    password: Yup.string()
      .required("Password is required!")
      .min(8, "Password must be at least 8 characters!"),
  });

  const onSubmit = async (values) => {
    const response = await fetch("/api/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      console.log('Login successful!');
      navigate('/home');
    } else {
      console.error('Login failed!');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <h2>Login</h2>
        <div>
          <label htmlFor="email">Email:</label>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="p" className="error" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="p" className="error" />
        </div>
        <button type="submit">Login</button>
        <p>
          Don&apos;t have an account? <NavLink to="/register">Register</NavLink>
        </p>
      </Form>
    </Formik>
  );
}

export default LoginPage;