import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://ff-game-back-end.vercel.app/api/login', { email, password });
      console.log('Login response:', response.data);
      localStorage.setItem('userId', response.data.user.id); // Store userId
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="overlay"></div>
      <button className="home-btn" onClick={() => navigate('/')}>🏠 Home</button>
      <div className="login-card">
        <h2>🔥 Free Fire Tournament Login 🔥</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-btn">🎮 Login</button>
        </form>
        <p className="signup-link">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
