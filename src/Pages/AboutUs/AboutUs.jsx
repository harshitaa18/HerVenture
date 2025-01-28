import React from 'react';
import './AboutUs.css';
import HeaderImage from '../../Components/Assets/purple-bg2.webp';
import Header from '../../Components/Header';
import Team from './Team';

export const AboutUs = () => {
    const data = [
        { icon: '👨‍🏫', count: '34084+', label: ' Mentees' },
        { icon: '👥', count: '579+', label: ' Mentors' },
        { icon: '📚', count: '43+', label: ' Programs' },
        { icon: '🌿', count: '835+', label: 'Government Initiatives' } // New card added
    ];

    return (
        <>
            <Header title="About Us" image={HeaderImage}>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio perspiciatis fugit nesciunt mollitia quasi? Velit earum veniam deserunt vitae praesentium.</p>
            </Header>
            <section className="about_story">
                <div className="container about_story-container">
                    {/* <div className="about_section-image">
                        <img src="path_to_your_image.jpg" alt="About Us" /> 
                    </div> */}
                    <div className="statistics">
                        {data.map((item, index) => (
                            <div className="stat-card" key={index}>
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <div className="icon">{item.icon}</div>
                                        <div className="count">{item.count}</div>
                                        <div className="label">{item.label}</div>
                                    </div>
                                    <div className="flip-card-back">
                                        <p>More information about {item.label}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Team />
        </>
    );
};

export default AboutUs;
