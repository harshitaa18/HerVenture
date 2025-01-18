import React from "react";
import "./TrainingAndWebinar.css";
import img1 from "../../Components/Assets/images.jpg"

const TrainingAndWebinars = () => {
  const events = [
    {
      id: 1,
      title: "Marketing Strategies for Startups",
      date: "2025-02-10",
      mentor:"Anukriti",
      img: img1,
      description: "Learn effective marketing strategies to grow your startup from industry experts."
    },
    {
      id: 2,
      title: "Legal Compliance Basics",
      date: "2025-02-15",
      mentor: "Diya",
      img : img1,
      description: "Understand the legal requirements and compliance essentials for startups."
    },
    {
      id: 3,
      title: "Financial Planning 101",
      date: "2025-02-20",
      mentor:"Shreya",
      img : img1,
      description: "Master the basics of financial planning to ensure your startup's success."
    }
  ];

  return (
    <div className="training-webinars">
      <header className="header">
        <h1>Training and Webinars</h1>
        <p>Enhance your skills with expert-led sessions.</p>
      </header>

      <section>
        <h2>Events and Webinars</h2>
        <div className="cards-container">
          {events.map((event) => (
            <div key={event.id} className="card">
              <div className="card-inner">
                <div className="card-front">
                  <div className="card-left">
                    <img className="card-img" src={event.img} alt="" />
                  </div>
                  <div className="card-right">
                    <h3 className="card-title">{event.title}</h3>
                    <p className="card-date">{event.date}</p>
                    <p className="card-mentor">{event.mentor}</p>
                  </div>
                </div>
                <div className="card-back">
                  <p className="card-description">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TrainingAndWebinars;