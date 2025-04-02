import React from 'react'
import './Footer.css'
import logo from '../Assets/logo.png'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-content">
            <div className="footer-left">
                <div className='logoo'>
                    <img src={logo} alt="" />
                    <h3>HerVenture</h3>
                </div>
                <p>"Stronger Together, Bolder Forever."</p>
            </div>
        
            <div className="footer-right">
                <ul>
                    <li>GH Rupa ki Nangal, Post-Sumel, Via-Jamdoli, Jaipur</li>
                    <li>HerVenture@gmail.com</li>
                    <li>+123 4567 890</li>
                </ul>
            </div>
        </div>
        <p className='last'>Copyright © 2025</p> 
    </div>
  )
}

export default Footer