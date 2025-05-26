import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { FaAirbnb, FaUserCircle, FaChevronDown } from 'react-icons/fa';

const Header = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <Link to="/" className="flex items-center text-rose-500">
        <FaAirbnb className="text-3xl mr-2" />
        <span className="font-bold text-xl">airbnb</span>
      </Link>
      
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 border border-gray-300 rounded-full py-1 px-3 hover:shadow-md transition"
            >
              <FaUserCircle className="text-gray-600" />
              <span>{user.username}</span>
              <FaChevronDown className="text-xs" />
            </button>
            
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <Link
                  to="/reservations"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  View Reservations
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/become-host"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-full"
          >
            Become a Host
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;