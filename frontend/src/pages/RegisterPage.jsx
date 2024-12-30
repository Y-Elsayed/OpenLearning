import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function RegisterPage() {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      dateOfBirth: '',
    }, 
    // Form validation function
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less.")
        .matches(/^[A-Za-z]+$/, "First name must contain only alphabetic characters."),
      lastName: Yup.string()
        .max(15, "Must be 15 characters or less.")
        .matches(/^[A-Za-z]+$/, "Last name must contain only alphabetic characters."),
      username: Yup.string(),
      email: Yup.string()
        .email("Invalid email address."),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters."),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords must match."),
      gender: Yup.string(),
      dateOfBirth: Yup.date(),
    }),
    // Form submit function
    onSubmit: async (values) => {
      // Remove confirmPassword from values
      const { confirmPassword, ...filteredValues } = values;

      const response = await fetch("/api/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filteredValues),
      });
      if (response.ok) {
        console.log('Register successful!');
      }
      else {
        console.error('Register failed!');
      }
    }
  });

  // Calculate the maximum date (today's date)
  const today = new Date().toISOString().split('T')[0];

  // Calculate the minimum date (100 years ago)
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 100);
  const minDateString = minDate.toISOString().split('T')[0];

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>Register</h2>
      <div>
        <label>First Name:</label>
        <input type="text" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} required />
        {formik.errors.firstName && <p className="error">{formik.errors.firstName}</p>}
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" name="lastName" value={formik.values.lastName} onChange={formik.handleChange} required />
        {formik.errors.lastName && <p className="error">{formik.errors.lastName}</p>}
      </div>
      <div>
        <label>Username:</label>
        <input type="text" name="username" value={formik.values.username} onChange={formik.handleChange} required />
      </div>
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
      <div>
        <label>Confirm Password:</label>
        <input type="password" name="confirmPassword" value={formik.values.confirmPassword} onChange={formik.handleChange} required minLength={8} />
        {formik.errors.confirmPassword && <p className="error">{formik.errors.confirmPassword}</p>}
      </div>
      <div>
        <label>Gender:</label>
        <select name="gender" value={formik.values.gender} onChange={formik.handleChange} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
      </div>
      <div>
        <label>Date of Birth:</label>
        <input type="date" name="dateOfBirth" value={formik.values.dateOfBirth} onChange={formik.handleChange} required min={minDateString} max={today}/>
      </div>
      <button type="submit">Register</button>
      <p>
        Already have an account? <NavLink to="/">Login</NavLink>
      </p>
    </form>
  );
}

export default RegisterPage;