import React from 'react';
import '../styles/home.css';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate()
  const handleManage=()=>{
    navigate('/')
  }
  return (
    <div className="app">
      <div className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Travel Comfortably Anywhere, Anytime</h1>
            <p className="subtitle">
              Book your perfect bus journey with thousands of routes, comfortable seats, and unbeatable prices. 
              Your adventure starts here.
            </p>
            
            <div className="cta-buttons">
              <button className="primary-btn" onClick={()=>handleManage()}>Book Now</button>
              <button className="secondary-btn">
                <span className="play-icon">▶</span> Watch Demo
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Home;