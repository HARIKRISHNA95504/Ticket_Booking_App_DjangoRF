

import React, { useState }  from 'react'
import '../styles/loginForm.css';
import axios from 'axios'
const LoginForm = ({onLogin}) => {
    const [htmlForm, sethtmlForm] = useState({
        username: '', email: '', password: ''
      });
      const [message,setMessage] = useState('')
    
      const handleChange = (e) => {
        sethtmlForm({ ...htmlForm, [e.target.name]: e.target.value });
      };
    const handleSubmit = async(e)=>{
      e.preventDefault()
      try{
        const response =await axios.post('http://localhost:8000/api/login/',htmlForm)
        setMessage('Login Successfull') 

        if(onLogin){
          onLogin(response.data.token,response.data.user_id)
        }
      }catch(error){
        setMessage('Login Succcess')
      }
    }
  return (
    <div className='login-container'>
        <div className="wrapper">
  <div className="login_box">
    <form onSubmit={handleSubmit}>
        <div className="login-header">
            <span>Login</span>
        </div>
        {message&&<p>{message}</p>}
        <div className="input_box">
            <input type="text" name='username' id="user" className="input-field" value={htmlForm.username} onChange={handleChange} required/>
            <label htmlFor="username" className="label">Username</label>
            <i className="bx bx-user icon"></i>
        </div>
        {/* <div className="input_box">
            <input type="email" name='email' id="email" className="input-field" value={htmlForm.email} onChange={handleChange} required/>
            <label htmlFor="email" className="label">Email</label>
            <i className="bx bx-user icon"></i>
        </div> */}
        <div className="input_box">
            <input type="password" name='password' id="pass" className="input-field" value={htmlForm.password} onChange={handleChange} required/>
            <label htmlFor="pass" className="label">Password</label>
            <i className="bx bx-lock-alt icon"></i>
        </div>
        <div className="input_box">
            {/* <input type="submit" className="input-submit" value="Register"/> */}
            <button type='submit' className='input-submit'>Login</button>
        </div>
    </form>
    <div className="register">
      <span>Don't have an account? <a href="/register">Register</a></span>
    </div>
  </div>
</div>
    </div>
  
  )
}

export default LoginForm;
