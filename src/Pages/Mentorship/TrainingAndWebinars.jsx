import React, { useState } from "react";
import "./TrainingAndWebinar.css";
import img1 from "../../Components/Assets/images.jpg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const TrainingAndWebinars = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchFilter, setSearchFilter] = useState("");

  const events = [
    {
      id: 1,
      title: "Marketing Strategies for Startups",
      date: "2025-02-10",
      mentor: "Anukriti",
      img: img1,
      description: "Learn effective marketing strategies to grow your startup from industry experts.",
    },
    {
      id: 2,
      title: "Legal Compliance Basics",
      date: "2025-02-15",
      mentor: "Diya",
      img: img1,
      description: "Understand the legal requirements and compliance essentials for startups.",
    },
    {
      id: 3,
      title: "Financial Planning 101",
      date: "2025-02-20",
      mentor: "Shreya",
      img: img1,
      description: "Master the basics of financial planning to ensure your startup's success.",
    },
  ];

  const recordedWebinars = [
    { title: "Marketing Trends of 2024", category: "Marketing" },
    { title: "Intellectual Property Essentials", category: "Legal Compliance" },
    { title: "Tax Planning for Startups", category: "Financial Planning" },
  ];

  const categories = [
    "Marketing",
    "Legal Compliance",
    "Financial Planning",
    "Technology",
    "Leadership Skills",
  ];

  const filteredWebinars = recordedWebinars.filter((webinar) =>
    webinar.title.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="training-webinars">
      <header className="header">
        <h1>Training and Webinars</h1>
        <p>Enhance your skills with expert-led sessions.</p>
      </header>

      {/* Calendar and Upcoming Events Section */}
      <section className="calendar-events-section">
        <div className="calendar-container">
          <h2>Event Calendar</h2>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
          />
          <p className="calendar-date">
            Selected Date: {selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>

        <div className="events-container">
          <h2>Upcoming Events</h2>
          <div className="cards-container">
            {events
              .filter((event) => new Date(event.date).toDateString() === selectedDate.toDateString())
              .map((event) => (
                <div key={event.id} className="card">
                  <div className="card-inner">
                    <div className="card-front">
                      <div className="card-left">
                        <img className="card-img" src={event.img} alt="Event" />
                      </div>
                      <div className="card-right">
                        <h3 className="card-title">{event.title}</h3>
                        <p className="card-date">{event.date}</p>
                        <p className="card-mentor">Mentor: {event.mentor}</p>
                      </div>
                    </div>
                    <div className="card-back">
                      <p className="card-description">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Recorded Webinars Section */}
      <section>
        <h2>Recorded Webinars</h2>
        <input
          type="text"
          placeholder="Search webinars..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="search-input"
        />
        <ul className="recorded-webinars">
          {filteredWebinars.map((webinar, index) => (
            <li key={index}>{webinar.title}</li>
          ))}
        </ul>
      </section>

      {/* Topic Categories Section */}
      <section>
        <h2>Topic Categories</h2>
        <div className="categories">
          {categories.map((category, index) => (
            <span key={index} className="category">
              {category}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TrainingAndWebinars;
