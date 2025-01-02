import { NavLink , useNavigate} from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function RegisterPage() {
  const navigate = useNavigate();

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
    gender: Yup.string()
      .required("Gender is required!"),
    dateOfBirth: Yup.date()
      .required("Date of birth is required!"),
  });
  // Form submit function
  const onSubmit = async (values) => {
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
      navigate('/home'); // Redirect to home page
    }
    else {
      console.error('Register failed!');
    }
  };

  // Calculate the maximum date (today's date)
  const today = new Date().toISOString().split('T')[0];

  // Calculate the minimum date (100 years ago)
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 100);
  const minDateString = minDate.toISOString().split('T')[0];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
    <Form >
      <h2>Register</h2>
      <div>
        <label>First Name:</label>
        <Field type="text" name="firstName" />
        <ErrorMessage name="firstName" component="p" className="error" />
      </div>
      <div>
        <label>Last Name:</label>
        <Field type="text" name="lastName"/>
        <ErrorMessage name="lastName" component="p" className="error" />
      </div>
      <div>
        <label>Username:</label>
        <Field type="text" name="username"/>
        <ErrorMessage name="username" component="p" className="error" />
      </div>
      <div>
        <label>Email:</label>
        <Field type="email" name="email"/>
        <ErrorMessage name="email" component="p" className="error" />

      </div>
      <div>
        <label>Password:</label>
        <Field type="password" name="password" />
        <ErrorMessage name="password" component="p" className="error" />
      </div>
      <div>
        <label>Confirm Password:</label>
        <Field type="password" name="confirmPassword"/>
        <ErrorMessage name="confirmPassword" component="p" className="error" />
      </div>
      <div>
        <label>Gender:</label>
        <select name="gender">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
        <ErrorMessage name="gender" component="p" className="error" />
      </div>
      <div>
        <label>Date of Birth:</label>
        <Field type="date" name="dateOfBirth" min={minDateString} max={today}/>
        <ErrorMessage name="dateOfBirth" component="p" className="error" />
      </div>
      <button type="submit">Register</button>
      <p>
        Already have an account? <NavLink to="/">Login</NavLink>
      </p>
    </Form>
    </Formik>
  );
}

export default RegisterPage;