import React from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import { Link } from 'react-router-dom';
import { useUser } from '../../Context/UserContext';
import profilePic from '../Assets/pic3.jpg';

export const Navbar = () => {
  const { userData } = useUser();

  return (
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
        <li><Link to='/login' >LogIn / SignUp</Link></li>

        {/* Profile Photo for Dashboard Link */}
        <li className='profile-icon'>
          <Link to='/dashboard'>
            <img 
              src={userData?.profilePicture || profilePic} 
              alt="Profile" 
              className="profile-pic" 
            />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
