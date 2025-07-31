// import React from 'react'
// import {Link} from 'react-router-dom'
// const Wrapper = ({token,handleLogout,children}) => {
//     const logout = ()=>{
//         handleLogout()
//     }
//   return (
//     <div>
//         {token?(
//             <button onClick={logout}>Logout</button>
//         ):
//         <Link to="/login">
//             <button>Login</button>
//         </Link>}
//         <main>{children}</main>
//     </div>
//   )
// }

// export default Wrapper
// components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/wrapper.css'; // Optional: create your own styles here

const Navbar = ({ token, handleLogout }) => {
  const navigate = useNavigate();

  const logoutAndRedirect = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/home">BusBooking</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Buses</Link></li>
        {token && <li><Link to="/my-bookings">My Bookings</Link></li>}
        {!token && <li><Link to="/login">SignIn</Link></li>}
        {token && (
          <li>
            <button onClick={logoutAndRedirect} className="logout-btn">
              SignOut
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
