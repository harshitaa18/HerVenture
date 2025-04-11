import React from 'react';
import './AboutUs.css';
import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import Harshita from '../../Components/Assets/harshita_2.jpg';
import Mtree from '../../Components/Assets/mtree_2.jpg';
import PalakImage from '../../Components/Assets/palak_2.jpg';

export const Team = () => {
  const teamMembers = [
    {
      img: Harshita,
      name: 'Harshita Sharma',
      instagram: 'https://www.instagram.com/harshitaa_184?igsh=MTZvZGdjb3Q3NzEwcg==',
      linkedin: 'https://www.linkedin.com/in/harshita-sharma-473915255/',
      email: '22uec053@lnmiit.ac.in',
    },
    {
      img: Mtree,
      name: 'Maitreyee Kulkarni',
      instagram: 'https://www.instagram.com/maitreyee_1102?igsh=MzhoZ2EzbDRmaGFt',
      linkedin: 'https://www.linkedin.com/in/maitreyee-kulkarni-b94141259/',
      email: '22ucc060@lnmiit.ac.in',
    },
    {
      img: PalakImage,
      name: 'Palak Kabra',
      instagram: 'https://www.instagram.com/kabra_palak?igsh=MXNyNTZtZGRxZ2N2bw==',
      linkedin: 'https://www.linkedin.com/in/palak-kabra-3a2646275/',
      email: '22uec089@lnmiit.ac.in',
    },
  ];

  return (
    <section className="team">
      <h2>Meet The Team</h2>
      <div className="container team_contain">
        {teamMembers.map((member, index) => (
          <TeamMember key={index} {...member} />
        ))}
      </div>
    </section>
  );
};

const TeamMember = ({ img, name, designation, instagram, linkedin, email }) => (
  <article className="team-member">
    <div className="team-member_img">
      <img src={img} alt={name} />
    </div>
    <div className="team-members_info">
      <h4>{name}</h4>
    </div>
    <div className="team-members_socials">
      <a href={instagram} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
      <a href={linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
      <a href={`mailto:${email}`}><FaEnvelope /></a>
    </div>
  </article>
);

export default Team;


