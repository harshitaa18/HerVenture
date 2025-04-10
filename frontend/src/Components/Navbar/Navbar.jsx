import React, { useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../Context/UserContext';
import profilePic from '../Assets/pic3.jpg';

export const Navbar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className='Navbar'>
      <div className='logo'>
        <img src={logo} alt="Logo" />
        <p>HerVenture</p>
      </div>
      <ul className='Navbar-menu'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/aboutUs'>About</Link></li>
        <li><Link to='/mentorship'>Mentorship</Link></li>
        <li><Link to='/policy'>Schemes and Policies</Link></li>

        {user ? (
          <li
            className='profile-icon'
            onMouseEnter={() => setDropdownVisible(true)}
            onMouseLeave={() => setDropdownVisible(false)}
          >
            <img src={profilePic} alt="Profile" className="profile-pic" />
            {dropdownVisible && (
              <div className="dropdown-menu">
                <Link to="/dashboard"  >
                  <button className="dropdown-item"><b>Dashboard</b></button></Link>
                <button className="dropdown-item" onClick={handleLogout}><b>Logout</b></button>
              </div>
            )}
          </li>
        ) : (
          <li>
            <Link to='/login'>LogIn / SignUp</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
