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
                    <h3>Foodio</h3>
                </div>
                <p>Viverra gravida morbi egestas facilisis tortor netus non duis tempor.</p>
            </div>
        
            <div className="footer-right">
                <ul>
                    <li>2972 Westheimer Rd. Santa Ana, Illinois 85486</li>
                    <li>abc@example.com</li>
                    <li>+123 4567 890</li>
                </ul>
            </div>
        </div>
        <p className='last'>Copyright © 2024</p> 
    </div>
  )
}

export default Footer