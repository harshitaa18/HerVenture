// components/Experience.jsx
import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaBriefcase } from "react-icons/fa";
import "./caseStudy.css";

const experiences = [
  {
    title: "Dipti Kabra",
    company_name: "Kiara Creations",
    icon: <FaBriefcase />,
    date: "Sikar,Rajasthan",
    points: [
        "Kiara’s journey with her boutique highlights common struggles of women-led businesses—sourcing affordable materials, finding skilled labor, and sustaining marketing and finances. Her story raises key questions about improving supplier access, building a supportive labor network, cost-effective marketing, and financial models for low-margin businesses.",
    ],
  },
  {
    title: "Sharda",
    company_name: "Salon at LNMIIT",
    icon: <FaBriefcase />,
    date: "LNMIIT,Jaipur",
    points: [
      "Despite financial hardship and societal restrictions, a determined woman in Jaipur built a successful salon within LNMIIT by learning beauty skills, gaining experience, and seizing local opportunities. Limited by traditional norms, she adapted by working from home and relying on family support. She also faced challenges in finding suppliers until a family connection helped her access wholesale materials. Her journey reflects the quiet strength of women who grow within constraints to achieve independence.",
    ],
  },
  {
    title: "Maitreyee and Ishita",
    company_name: "Ghena by Yashi & Ardhangini ",
    icon: <FaBriefcase />,
    date: "Jaipur,Rajasthan",
    points: [
      "In the heart of Raja Park, Jaipur, childhood friends Maitreyee and Ishita launched Ghena by Yashi and Ardhangini—twin ventures offering rental jewellery and handcrafted Indian wear. A major early struggle was finding a centrally located yet affordable space that aligned with their vision. After a long search, they secured a location through a local connection, balancing visibility with cost. Their story reflects the persistence required to overcome logistical hurdles while building a unique, accessible fashion brand.",
    ],
  },
  {
    title: "Anu and Nisha",
    company_name: "RadhaKrishan Pharmacy",
    icon: <FaBriefcase />,
    date: "Jaipur,Rajasthan",
    points: [
      "Anu and Nisha, two sisters from the outskirts of Jaipur, built RadhaKrishan Pharmacy from scratch, overcoming financial hardship and social pressure. One of their biggest struggles was finding the right land for their store, spending six months in the scorching heat before securing a suitable location. Now independently managing the pharmacy, they plan to open a new branch in rural areas—aiming to improve medical access while also providing employment opportunities for young women, reflecting their vision of community upliftment and empowerment.",
    ],
  },
  {
    title: "Supreet Kaur",
    company_name: "Miss Bakers",
    icon: <FaBriefcase />,
    date: "Jaipur,Rajasthan",
    points: [
      "Supreet turned her passion for baking into Miss Bakers, starting from her home’s front lawn with strong family support. She faced challenges in finding skilled labor, sourcing supplies, and managing space. After her move, her mother took over, keeping the bakery thriving. Her journey reflects common struggles women entrepreneurs face—challenges HerVenture aims to solve through better access to labor, suppliers, and workspace.",
    ],
  },
];

const Experience = () => {
  return (
    <div className="experience-section">
      <h2 className="experience-title">Stories That Shaped Us</h2>
      <VerticalTimeline>
        {experiences.map((exp, index) => (
          <VerticalTimelineElement
            key={index}
            date={exp.date}
            iconStyle={{ background: "#d058e5", color: "#fff" }}
            icon={exp.icon}
            contentStyle={{ background: "#fff", color: "#333" }}
            contentArrowStyle={{ borderRight: "7px solid #fff" }}
          >
            <h3 className="experience-role">{exp.title}</h3>
            <h4 className="experience-company">{exp.company_name}</h4>
            <ul className="experience-points">
              {exp.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Experience;
