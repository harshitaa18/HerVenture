import React from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import { Link } from 'react-router-dom';

export const Navbar = () => {

  return (
    <div className='Navbar'>
        <div className='logo'>
            <img src={logo} alt="" />
            <p>HerVenture</p>
        </div>
        <ul className='Navbar-menu'>
                <li><Link to='/' >Home</Link></li>
                <li><Link to='/aboutus' >About</Link></li>
                <li><Link to='/contact' >Contact us</Link></li>
        </ul>
    </div>
  )
}

export default Navbar;
