import React from 'react';
import './AboutUs.css';
import HeaderImage from '../../Components/Assets/about-us3.png';
import Header from '../../Components/Header';
import { Team } from './Team';
import Experience from './caseStudy';
import BusinessSection from './BusinessSection';

const AboutUs = () => {
    return (
        <> <div className='header-about'>
            <Header title="About Us" image={HeaderImage}>
                <p>
                    HerVenture empowers women entrepreneurs by providing mentorship, resources, and a supportive community to foster growth, collaboration, and success.
                </p>
            </Header>
            </div>

            {/* Business Help Section */}
            <BusinessSection />

            {/* Experience / Case Study section */}
            <Experience />

            <Team />
        </>
    );
};

export default AboutUs;
