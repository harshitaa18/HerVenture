import React, { useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../Context/UserContext';
import profilePic from '../Assets/pic3.jpg';
import { FaBars, FaTimes } from 'react-icons/fa';

export const Navbar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setDropdownVisible(false); // close dropdown if open
  };

  return (
    <div className='Navbar'>
      <div className='logo'>
        <img src={logo} alt="Logo" />
        <p>HerVenture</p>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>

      <ul className={`Navbar-menu ${menuOpen ? 'open' : ''}`}>
        <li><Link to='/' onClick={toggleMenu}>Home</Link></li>
        <li><Link to='/aboutUs' onClick={toggleMenu}>About</Link></li>
        <li><Link to='/mentorship' onClick={toggleMenu}>Mentorship</Link></li>
        <li><Link to='/policy' onClick={toggleMenu}>Schemes and Policies</Link></li>

        {user ? (
          <li
            className='profile-icon'
            onMouseEnter={() => setDropdownVisible(true)}
            onMouseLeave={() => setDropdownVisible(false)}
          >
            <img src={profilePic} alt="Profile" className="profile-pic" />
            {dropdownVisible && (
              <div className="dropdown-menu">
                <Link to="/dashboard" onClick={toggleMenu}>
                  <button className="dropdown-item"><b>Dashboard</b></button>
                </Link>
                <button className="dropdown-item" onClick={handleLogout}><b>Logout</b></button>
              </div>
            )}
          </li>
        ) : (
          <li><Link to='/login' onClick={toggleMenu}>LogIn / SignUp</Link></li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
