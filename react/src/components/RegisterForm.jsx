
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/registerForm.css';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [htmlForm, setHtmlForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setHtmlForm({ ...htmlForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (htmlForm.password !== htmlForm.confirmPassword) {
      toast.error("Passwords do not match!", {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/register/', {
        username: htmlForm.username,
        email: htmlForm.email,
        password: htmlForm.password,
      });

      toast.success('Registration successful! Redirecting to login...', {
        position: 'top-center',
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      const errorMsg =
        error.response?.data?.username?.[0] ||
        error.response?.data?.email?.[0] ||
        error.response?.data?.password?.[0] ||
        error.message;

      toast.error(`Registration failed: ${errorMsg}`, {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className='register-container'>
      <ToastContainer />
      <div className="wrapper">
        <div className="login_box">
          <form onSubmit={handleSubmit}>
            <div className="login-header">
              <span>Register</span>
            </div>

            <div className="input_box">
              <input
                type="text"
                name="username"
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
                type="email"
                name="email"
                id="email"
                className="input-field"
                value={htmlForm.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="email" className="label">Email</label>
              <i className="bx bx-envelope icon"></i>
            </div>

            <div className="input_box">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
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
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                id="confirmPass"
                className="input-field"
                value={htmlForm.confirmPassword}
                onChange={handleChange}
                required
              />
              <label htmlFor="confirmPass" className="label">Confirm Password</label>
              <i
                className={`bx ${showConfirmPassword ? 'bx-show' : 'bx-hide'} icon`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ cursor: 'pointer' }}
              ></i>
            </div>

            <div className="input_box">
              <button type="submit" className="input-submit">Register</button>
            </div>
          </form>

          <div className="register">
            <span>Already have an account? <a href="/login">Login</a></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

