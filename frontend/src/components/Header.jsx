import { Link, useNavigate } from 'react-router-dom';
import { getUser, logout } from '../auth';
import logo from '../assets/airbnb-logo.png';
import { useState } from 'react';
import { FaBars, FaUserCircle, FaGlobe } from 'react-icons/fa';

const Header = () => {
  const user = getUser();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Airbnb Logo" style={{ height: '64px' }} />
        </Link>

        {/* Center Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link to="/locations" style={{ fontWeight: 500, color: '#555', textDecoration: 'none' }}>
            Places to stay
          </Link>
          <span style={{ color: '#aaa' }}>Experiences</span>
          <span style={{ color: '#aaa' }}>Online Experiences</span>
        </div>

        {/* Right Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}>
          {/* Only show "Become a Host" if user is not a host */}
          {(!user || user.role !== 'host') && (
            <Link to="/admin-login">Become a Host</Link>
          )}
          <FaGlobe />

          {/* Dropdown */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #ddd',
              borderRadius: '999px',
              padding: '0.5rem',
              cursor: 'pointer',
              background: '#fff'
            }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars />
            <FaUserCircle style={{ marginLeft: '0.5rem' }} />
          </div>

          {menuOpen && (
            <div style={{
              position: 'absolute',
              top: '3rem',
              right: 0,
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              zIndex: 999,
            }}>
              {user ? (
                <>
                  <p style={{ marginBottom: '0.5rem' }}>Hi, {user.username}</p>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <button onClick={() => navigate('/login')}>Login</button>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
