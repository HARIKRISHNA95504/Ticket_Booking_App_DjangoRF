

import React, { useState } from 'react';
import '../styles/loginForm.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const [htmlForm, setHtmlForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setHtmlForm({ ...htmlForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login/', htmlForm);

      toast.success('Login Successful! Redirecting...', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
      });

      if (onLogin) {
        onLogin(response.data.token, response.data.user_id);
      }

      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      toast.error('Login Failed. Please check your credentials.', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className='login-container'>
      <ToastContainer />
      <div className="wrapper">
        <div className="login_box">
          <form onSubmit={handleSubmit}>
            <div className="login-header">
              <span>Login</span>
            </div>

            <div className="input_box">
              <input
                type="text"
                name='username'
                id="user"
                className="input-field"
                value={htmlForm.username}
                onChange={handleChange}
                required
              />
              <label htmlFor="username" className="label">Username</label>
              <i className="bx bx-user icon"></i>
            </div>

            <div className="input_box">
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                id="pass"
                className="input-field"
                value={htmlForm.password}
                onChange={handleChange}
                required
              />
              <label htmlFor="pass" className="label">Password</label>
              <i
                className={`bx ${showPassword ? 'bx-show' : 'bx-hide'} icon`}
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: 'pointer' }}
              ></i>
            </div>

            <div className="input_box">
              <button type='submit' className='input-submit'>Login</button>
            </div>
          </form>

          <div className="register">
            <span>Don't have an account? <a href="/register">Register</a></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
