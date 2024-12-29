import { useState } from 'react';
import { NavLink } from 'react-router-dom';

// you can use props here to get server_url as an input
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    const response = await fetch("/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    console.log('Login:', JSON.stringify({ email, password }));
    if (response.ok) {
      console.log('Login successful!');
    }
    else {
      console.error('Login failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
      </div>
      <button type="submit">Login</button>
      <p>
        Don&apos;t have an account? <NavLink to="/register">Register</NavLink>
      </p>
    </form>
  );
}

export default LoginPage;