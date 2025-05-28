import { useState } from 'react';
import api from '../api/axios';
import { login } from '../auth';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/airbnb-logo.png';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/users/login', { username, password });
      const user = res.data.user;
      if (user.role !== 'host') {
        setError('Only hosts can access the dashboard.');
        return;
      }

      login(res.data.token, user);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-container">
          <img src={Logo} alt="Airbnb Logo" className="logo" />
        </div>
        <h1 className="login-title">Admin Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="forgot-password">
            <a href="/forgot-password" className="forgot-link">Forgot Password?</a>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>

      <style jsx>{`
        .login-container {
          display: flex;
          height: 100vh;
          justify-content: center;
          align-items: center;
          background-color: #f7f7f7;
        }
        
        .login-box {
          background: white;
          padding: 2.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }
        
        .logo-container {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        
        .logo {
          height: 32px;
          width: auto;
        }
        
        .login-title {
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: #333;
          text-align: center;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: #555;
        }
        
        .form-input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          transition: border-color 0.2s;
        }
        
        .form-input:focus {
          outline: none;
          border-color: #FF5A5F;
        }
        
        .forgot-password {
          text-align: right;
          margin-bottom: 1.5rem;
        }
        
        .forgot-link {
          color: #767676;
          font-size: 0.9rem;
          text-decoration: none;
          transition: color 0.2s;
        }
        
        .forgot-link:hover {
          color: #FF5A5F;
          text-decoration: underline;
        }
        
        .login-button {
          width: 100%;
          padding: 0.75rem;
          background-color: #FF5A5F;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .login-button:hover {
          background-color: #E04B50;
        }
        
        .error-message {
          color: #FF5A5F;
          margin-top: 1rem;
          text-align: center;
          font-size: 0.9rem;
        }
        
        @media (max-width: 480px) {
          .login-box {
            padding: 1.5rem;
            margin: 0 1rem;
          }
          
          .logo {
            height: 28px;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;