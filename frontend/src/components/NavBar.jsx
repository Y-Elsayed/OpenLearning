// filepath: /Users/aymantalat/repos/openLearningRepo/OpenLearning/frontend/src/components/NavBar.jsx
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function NavBar({ onLogout }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <NavLink to="/home" className="text-white">Home</NavLink>
        <NavLink to="/explore" className="text-white">Explore</NavLink>
      </div>
      <div className="flex items-center">
        <input type="text" placeholder="Search..." className="p-2 rounded" />
      </div>
      <div className="flex items-center space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => navigate('/create-post')}>Create Post</button>
        <div className="relative">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setDropdownOpen(!dropdownOpen)}>
            Profile
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
              <NavLink to="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Settings</NavLink>
              <NavLink to="/posts" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Posts</NavLink>
              <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;