import React, { useState }  from 'react'
import axios from 'axios'
import '../styles/registerForm.css'
const RegisterhtmlForm = () => {
    const [htmlForm, sethtmlForm] = useState({
        username: '', email: '', password: ''
      });
      const [message,setMessage] = useState('')
    
      const handleChange = (e) => {
        sethtmlForm({ ...htmlForm, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            await axios.post('http://localhost:8000/api/register/',htmlForm)
            setMessage('Register Successfull')
        }catch(error){
           setMessage("Register failed",+(error.response?.data?.username || error.message)) 
        }
        console.log(htmlForm);
      };
  return (
  <div className='register-container'>
    <div className="wrapper">
  <div className="login_box">
    <form onSubmit={handleSubmit}>
        <div className="login-header">
            <span>Register</span>
        </div>
        {message&&<p>{message}</p>}
        <div className="input_box">
            <input type="text" name='username' id="user" className="input-field" value={htmlForm.username} onChange={handleChange} required/>
            <label htmlFor="username" className="label">Username</label>
            <i className="bx bx-user icon"></i>
        </div>
        <div className="input_box">
            <input type="email" name='email' id="email" className="input-field" value={htmlForm.email} onChange={handleChange} required/>
            <label htmlFor="email" className="label">Email</label>
            <i className="bx bx-user icon"></i>
        </div>
        <div className="input_box">
            <input type="password" name='password' id="pass" className="input-field" value={htmlForm.password} onChange={handleChange} required/>
            <label htmlFor="pass" className="label">Password</label>
            <i className="bx bx-lock-alt icon"></i>
        </div>
        <div className="input_box">
            {/* <input type="submit" className="input-submit" value="Register"/> */}
            <button type='submit' className='input-submit'>Register</button>
        </div>
    </form>
    <div className="register">
      <span>Already have an account? <a href="/login">Login</a></span>
    </div>
  </div>
</div>
  </div>
  )
}

export default RegisterhtmlForm