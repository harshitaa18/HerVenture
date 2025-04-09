import React  from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import { Link } from 'react-router-dom';
import { useUser } from '../../Context/UserContext';
import profilePic from '../Assets/pic3.jpg';

export const Navbar = () => {
  const { user } = useUser();
  console.log("userData in Navbar:", user);
  return (
    <>
      <div className='Navbar'>
        <div className='logo'>
          <img src={logo} alt="Logo" />
          <p>HerVenture</p>
        </div>
        <ul className='Navbar-menu'>
          <li><Link to='/' >Home</Link></li>
          <li><Link to='/aboutUs' >About</Link></li>
          <li><Link to='/mentorship'>Mentorship</Link></li>
          <li><Link to='/policy'>Schemes and Policies</Link></li>

          {user ? (
  // Show profile pic if user is logged in
              <li className='profile-icon'>
                <Link to='/dashboard'>
                  <img 
                    src={profilePic} 
                    alt="Profile" 
                    className="profile-pic" 
                  />
                </Link>
              </li>
            ) : (
              // Show login/signup if user is not logged in
              <li>
                <Link to='/login'>LogIn / SignUp</Link>
              </li>
        )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
