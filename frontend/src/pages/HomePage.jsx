import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import NavBar from '../components/NavBar';

function HomePage({ onLogout }) {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.user.id);
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        onLogout();
      }
    }
  }, [onLogout]);

  // TODO: Request posts from the server

  return (
    <>
      <NavBar onLogout={onLogout}/>
      <h1 className="text-4xl font-bold mb-4">Home Page</h1>
      <p className="text-lg">User ID: {userId}</p> {/* Display userId for verification */}
    </>
  );
}

export default HomePage;