import { useNavigate, NavLink } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address!")
      .required("Email is required!"),
    password: Yup.string()
      .required("Password is required!")
      .min(8, "Password must be at least 8 characters!"),
  });

  const onSubmit = async (values) => {
    try {
      const response = await fetch("/api/users/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();

      // Store the token in localStorage
      localStorage.setItem('token', data.token);
      onLogin(data.token); // Call the login function from props
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
      setServerError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {serverError && <p className="text-red-500 mb-4">{serverError}</p>}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email:</label>
              <Field type="email" name="email" className="mt-1 p-2 w-full border rounded" />
              <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password:</label>
              <Field type="password" name="password" className="mt-1 p-2 w-full border rounded" />
              <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Login</button>
          </Form>
        </Formik>
        <p className="mt-4 text-center">
          Don't have an account? <NavLink to="/register" className="text-blue-500 hover:underline">Register</NavLink>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;