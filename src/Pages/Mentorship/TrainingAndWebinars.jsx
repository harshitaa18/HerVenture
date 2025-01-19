import React, { useState } from "react";
import "./TrainingAndWebinar.css";
import img1 from "../../Components/Assets/img5.jpg";
import img2 from "../../Components/Assets/webinar-banner.jpg";
import img3 from "../../Components/Assets/webinar-banner-2.webp";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const TrainingAndWebinars = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchFilter, setSearchFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const events = [
    {
      id: 1,
      title: "Marketing Strategies for Startups",
      date: "2025-02-10",
      mentor: "Anukriti",
      img: img2,
      description: "Learn effective marketing strategies to grow your startup from industry experts.",
      link : "https://www.youtube.com/watch?v=-4nBFy4SJK4",
    },
    {
      id: 2,
      title: "Legal Compliance Basics",
      date: "2025-02-15",
      mentor: "Diya",
      img: img3,
      description: "Understand the legal requirements and compliance essentials for startups.",
      link : "https://www.youtube.com/watch?v=-4nBFy4SJK4",
    },
    {
      id: 3,
      title: "Financial Planning 101",
      date: "2025-02-20",
      mentor: "Shreya",
      img: img1,
      description: "Master the basics of financial planning to ensure your startup's success.",
      link : "https://www.youtube.com/watch?v=-4nBFy4SJK4",
    },
  ];

  const recordedWebinars = [
    { title: "Marketing Trends of 2024", category: "Marketing", img: img1 },
    { title: "Intellectual Property Essentials", category: "Legal Compliance", img: img3 },
    { title: "Tax Planning for Startups", category: "Financial Planning", img: img2 },
  ];

  const categories = [
    "All",
    "Marketing",
    "Legal Compliance",
    "Financial Planning",
    "Technology",
    "Leadership Skills",
  ];

  const filteredWebinars = recordedWebinars.filter((webinar) =>
    (categoryFilter === "All" || !categoryFilter || webinar.category === categoryFilter) &&
    webinar.title.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="training-webinars">

      {/* Calendar and Upcoming Events Section */}
      <section className="calendar-events-section">
        <div className="calendar-container">
          <h2>Event Calendar</h2>
          <Calendar onChange={setSelectedDate} value={selectedDate} />
          <p className="calendar-date">
            Selected Date:{" "}
            {selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>

        <div className="events-container">
        <h2 className="upcoming">Upcoming Events</h2>
        <div className="cards-container">
          {events.filter((event) => new Date(event.date).toDateString() === selectedDate.toDateString()).length === 0 ? (
            <p className="no-events-message">No upcoming webinars for this date.</p>
          ) : (
            events
              .filter((event) => new Date(event.date).toDateString() === selectedDate.toDateString())
              .map((event) => (
                <div key={event.id} className="card">
                  <div className="card-inner">
                    <div className="card-front">
                      <a href={event.link} target="_blank" rel="noopener noreferrer">
                        <div className="img-container">
                          <img className="card-img" src={event.img} alt="Event" />
                          <div className="play-overlay">
                            <i className="play-icon">▶</i>
                          </div>
                        </div>
                      </a>
                      <h3 className="card-title">{event.title}</h3>
                      <p className="card-date">{new Date(event.date).toLocaleDateString()}</p>
                      <p className="card-mentor">Mentor: {event.mentor}</p>
                    </div>
                    <div className="card-back">
                      <p className="card-description">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
</div>


      </section>
      {/* Topic Categories with Filters */}
      <section className="categories-section">
        <h2>Topic Categories</h2>
        <div className="categories">
          {categories.map((category, index) => (
            <span
              key={index}
              className={`category ${categoryFilter === category ? "active" : ""}`}
              onClick={() => setCategoryFilter(category === "All" ? "" : category)}
            >
              {category}
            </span>
          ))}
        </div>
      </section>

      {/* Recorded Webinars Section */}
      <div className="recorded">
        <h2>Recorded Webinars</h2>
        <input
          type="text"
          placeholder="Search webinars..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="search-input"
        />
        <div className="cards-container">
          {filteredWebinars.map((webinar, index) => (
            <div key={index} className="card">
              <img className="card-img" src={webinar.img} alt="Webinar" />
              <h3 className="card-title">{webinar.title}</h3>
              <p className="card-category">{webinar.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainingAndWebinars;
