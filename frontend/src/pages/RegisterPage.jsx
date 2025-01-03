import { NavLink , useNavigate} from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

function RegisterPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const initialValues =  {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dateOfBirth: '',
  };
  // Form validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First name is required!")
      .max(15, "Must be 15 characters or less!")
      .matches(/^[A-Za-z]+$/, "First name must contain only alphabetic characters!"),
    lastName: Yup.string()
      .required("Last name is required!")
      .max(15, "Must be 15 characters or less!")
      .matches(/^[A-Za-z]+$/, "Last name must contain only alphabetic characters!"),
    username: Yup.string()
      .required("Username is required!"),
    email: Yup.string()
      .required("Email is required!")
      .email("Invalid email address!"),
    password: Yup.string()
      .required("Password is required!")
      .min(8, "Password must be at least 8 characters!"),
    confirmPassword: Yup.string()
      .required("Confirm password is required!")
      .oneOf([Yup.ref('password'), null], "Passwords must match!"),
    gender: Yup.string(),
    dateOfBirth: Yup.date()
      .required("Date of birth is required!"),
  });
  // Form submit function
  const onSubmit = async (values) => {
    try {
      const response = await fetch("/api/users/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      setServerError('An error occurred. Please try again.');
    }
  };

  // Calculate the maximum date (today's date)
  const today = new Date().toISOString().split('T')[0];

  // Calculate the minimum date (100 years ago)
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 100);
  const minDateString = minDate.toISOString().split('T')[0];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {serverError && <p className="text-red-500 mb-4">{serverError}</p>}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-gray-700">First Name:</label>
              <Field type="text" name="firstName" className="mt-1 p-2 w-full border rounded" />
              <ErrorMessage name="firstName" component="p" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-gray-700">Last Name:</label>
              <Field type="text" name="lastName" className="mt-1 p-2 w-full border rounded" />
              <ErrorMessage name="lastName" component="p" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700">Username:</label>
              <Field type="text" name="username" className="mt-1 p-2 w-full border rounded" />
              <ErrorMessage name="username" component="p" className="text-red-500 text-sm mt-1" />
            </div>
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
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password:</label>
              <Field type="password" name="confirmPassword" className="mt-1 p-2 w-full border rounded" />
              <ErrorMessage name="confirmPassword" component="p" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="gender" className="block text-gray-700">Gender:</label>
              <Field as="select" name="gender" className="mt-1 p-2 w-full border rounded">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </Field>
              <ErrorMessage name="gender" component="p" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="dateOfBirth" className="block text-gray-700">Date of Birth:</label>
              <Field type="date" name="dateOfBirth" className="mt-1 p-2 w-full border rounded" min={minDateString} max={today} />
              <ErrorMessage name="dateOfBirth" component="p" className="text-red-500 text-sm mt-1" />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Register</button>
          </Form>
        </Formik>
        <p className="mt-4 text-center">
          Already have an account? <NavLink to="/login" className="text-blue-500 hover:underline">Login</NavLink>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;