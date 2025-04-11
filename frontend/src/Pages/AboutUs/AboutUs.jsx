import React from 'react';
import './AboutUs.css';
import HeaderImage from '../../Components/Assets/about-us3.jpg';
import Header from '../../Components/Header';
import { Team } from './Team';
import Experience from './caseStudy';
import BusinessSection from './BusinessSection';

const AboutUs = () => {
    return (
        <>
            <Header title="About Us" image={HeaderImage}>
                <p>
                    HerVenture empowers women entrepreneurs by providing mentorship, resources, and a supportive community to foster growth, collaboration, and success.
                </p>
            </Header>

            {/* Meet the Team section */}

            {/* Business Help Section */}
            <BusinessSection />

            {/* Experience / Case Study section */}
            <Experience />

            <Team />
        </>
    );
};

export default AboutUs;
