import React from 'react';
import './AboutUs.css';
import HeaderImage from '../../Components/Assets/purple-bg2.webp';
import Header from '../../Components/Header';

export const AboutUs = () => {
    return (
        <>
            <Header title="About Us" image={HeaderImage}>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio perspiciatis fugit nesciunt mollitia quasi? Velit earum veniam deserunt vitae praesentium.</p>
            </Header>
            <section className="about_story">
                <div className="container about_story-container">
                    <div className="about_section-image">
                        <img src=" " alt="" />
                    </div>
                </div>
            </section>
        </>
    );
}
export default AboutUs;
