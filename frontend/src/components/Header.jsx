import { Link, useNavigate } from 'react-router-dom';
import { getUser, logout } from '../auth';

const Header = () => {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/">Airbnb Admin</Link>
        <div>
          {user ? (
            <>
              <span style={{ marginRight: '1rem' }}>Hello, {user.username}</span>
              {/* <Link to="/reservations" style={{ marginRight: '1rem' }}>Reservations</Link> */}
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login">Become a Host</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
