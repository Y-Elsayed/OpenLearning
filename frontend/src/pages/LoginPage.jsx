import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function LoginPage() {
  const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      }, 
      // Form validation function
      validationSchema: Yup.object({
        email: Yup.string()
          .email("Invalid email address!"),
        password: Yup.string()
          .min(8, "Password must be at least 8 characters!"),
      }),
      // Form submit function
      onSubmit: async (values) => {
        const response = await fetch("/api/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          console.log('Login successful!');
        }
        else {
          console.error('Login failed!');
        }
      }
    });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>Login</h2>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} required />
        {formik.errors.email && <p className="error">{formik.errors.email}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} required minLength={8} />
        {formik.errors.password && <p className="error">{formik.errors.password}</p>}
      </div>
      <button type="submit">Login</button>
      <p>
        Don&apos;t have an account? <NavLink to="/register">Register</NavLink>
      </p>
    </form>
  );
}

export default LoginPage;