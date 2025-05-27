import { useState } from 'react';
import api from '../api/axios';
import { login } from '../auth';
import { useNavigate } from 'react-router-dom';

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
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', width: '300px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Host Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
          />
          <button
            type="submit"
            style={{ width: '100%', padding: '0.75rem', backgroundColor: '#FF5A5F', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Login
          </button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;
