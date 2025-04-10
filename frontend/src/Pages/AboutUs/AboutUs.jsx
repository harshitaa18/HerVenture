import React from 'react';
import './AboutUs.css';
import HeaderImage from '../../Components/Assets/purple-bg2.webp';
import Header from '../../Components/Header';
import { FaClipboardList, FaFolderOpen, FaUsers, FaBullseye } from "react-icons/fa";
import {Team} from './Team';
import Experience from './caseStudy';      
export const AboutUs = () => {
    const features = [
        {
          icon: <FaClipboardList className="icon" />, 
          title: "Struggling to find the right land?", 
          description: "HerVenture offers exclusive features to help you discover the perfect space for your creation."
        },
        {
          icon: <FaFolderOpen className="icon" />, 
          title: "Looking for the right suppliers for your work?", 
          description: "HerVenture connects you with trusted partners to meet your needs."
        },
        {
          icon: <FaUsers className="icon" />, 
          title: "Struggling to find skilled labor?", 
          description: "HerVenture helps you connect with the right professionals for your needs."
        },
        {
          icon: <FaBullseye className="icon" />, 
          title: "And much more!", 
          description: ""
        }
      ];

    return (
        <>
            <Header title="About Us" image={HeaderImage}>
                <p>HerVenture empowers women entrepreneurs by providing mentorship, resources, and a supportive community to foster growth, collaboration, and success.</p>
            </Header>
            
            {/* Meet the Team section moved before Know More */}
            <Team />
            
            <section className="about_story">
                <div className="container about_story-container">
                   <div className="container-2">
                        <h2 className="heading">WANT HELP TO GROW YOUR BUSINESS?</h2>
                        <p className="subtext">We’ve got you covered!</p>
                        <div className="feature-list">
                            {features.map((feature, index) => (
                                <div key={index} className="feature-item">
                                    <div className="feature-icon">{feature.icon}</div>
                                    <div>
                                        <h3 className="feature-title">{feature.title}</h3>
                                        <p className="feature-description">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Experience/>
            </section>
        </>
    );
};

export default AboutUs;
