import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import CreatePostPage from './pages/CreatePostPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('jwt'));

  const login = (token) => {
    localStorage.setItem('jwt', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    setIsAuthenticated(false);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* Public Routes */}
        <Route index element={isAuthenticated ? <Navigate to="/home" /> : <LoginPage onLogin={login} />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <LoginPage onLogin={login} />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/home" /> : <RegisterPage />} />

        {/* Protected Routes */}
        <Route path="/home" element={isAuthenticated ? <HomePage onLogout={logout} /> : <Navigate to="/login" />} />
        <Route path="/create-post" element={isAuthenticated ? <CreatePostPage onLogout={logout} /> : <Navigate to="/login" />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
