import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    // Validate first name and last name
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(firstName)) {
      validationErrors.firstName = "First name must contain only alphabetic characters.";
    }
    if (!nameRegex.test(lastName)) {
      validationErrors.lastName = "Last name must contain only alphabetic characters.";
    }

    // Validate password
    if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match!";
    }

    // Validate date of birth
    if (new Date(dateOfBirth) > new Date()) {
      validationErrors.dateOfBirth = "Date of birth cannot be in the future!";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const response = await fetch("/api/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, firstName, lastName, email, password, gender, dateOfBirth }),
    });

    console.log('Register:', { username, firstName, lastName, email, password, gender, dateOfBirth });
    
    if (response.ok) {
      console.log('Register successful!');
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
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div>
        <label>First Name:</label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        {errors.firstName && <p className="error">{errors.firstName}</p>}
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        {errors.lastName && <p className="error">{errors.lastName}</p>}
      </div>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={8} />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
      </div>
      <div>
        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
      </div>
      <div>
        <label>Date of Birth:</label>
        <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required min={minDateString} max={today}/>
        {errors.dateOfBirth && <p className="error">{errors.dateOfBirth}</p>}
      </div>
      <button type="submit">Register</button>
      <p>
        Already have an account? <NavLink to="/">Login</NavLink>
      </p>
    </form>
  );
}

export default RegisterPage;