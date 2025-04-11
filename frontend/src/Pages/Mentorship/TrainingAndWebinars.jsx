import React, { useState } from "react";
import "./TrainingAndWebinar.css";
import img1 from "../../Components/Assets/market.webp";
import img2 from "../../Components/Assets/tax.webp";
import img3 from "../../Components/Assets/property.jpg";
import img4 from "../../Components/Assets/scheme.webp";
import img6 from "../../Components/Assets/market2.avif";
import img7 from "../../Components/Assets/webinar-banner.jpg";
import img8 from "../../Components/Assets/download.jpeg";
import img9 from "../../Components/Assets/tech.png";
import img10 from "../../Components/Assets/leader.jpg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Marquee from "react-fast-marquee";

const TrainingAndWebinars = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchFilter, setSearchFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const events = [
    {
      id: 1,
      title: "Digital Marketing",
      date: "2025-04-21",
      img: img1,
      description: "Learn effective marketing strategies to grow your startup from industry experts.",
      link: "https://www.youtube.com/watch?v=-4nBFy4SJK4",
    },
    {
      id: 2,
      title: "Marketing Strategies",
      date: "2025-04-22",
      img: img6,
      description: "Go through the best marketing strategies to grow to business",
      link: "https://www.youtube.com/watch?v=3w3QSrq4Rho",
    },
    {
      id: 3,
      title: "Empower Series",
      date: "2025-04-23",
      img: img7,
      description: "Master the basics of financial planning to ensure your startup's success.",
      link: "https://www.youtube.com/watch?v=eHJnEHyyN1Y",
    },
    {
      id: 4,
      title: "Ted-talk",
      date: "2025-04-24",
      img: img8,
      description: "Professor John Mullins shares six counter-conventional mindsets for entrepreneurs looking to think strategically, navigate challenges and change the world.",
      link: "https://www.youtube.com/watch?v=eHJnEHyyN1Y",
    },
    {
      id: 5,
      title: "Mindset Shift",
      date: "2025-04-25",
      img: img3,
      description: "How to Cultivate an Entrepreneurial Mindset.",
      link: "https://www.youtube.com/watch?v=niOV_jSVCKs",
    },
    {
      id: 6,
      title: "Empower Series",
      date: "2025-04-26",
      img: img2,
      description: "Tips and tricks to manage your startup taxes like a pro.",
      link: "https://www.youtube.com/watch?v=3w3QSrq4Rho",
    },
    {
      id: 7,
      title: "Empower Series",
      date: "2025-04-27",
      img: img6,
      description: "Explore digital innovation strategies for startups in 2025.",
      link: "https://www.youtube.com/watch?v=OC8s2_VSQFA",
    },
    {
      id: 8,
      title: "Empower Series",
      date: "2025-04-28",
      img: img7,
      description: "How to pitch your startup idea and win over investors.",
      link: "https://www.youtube.com/watch?v=RmwI_QqcPQc",
    },
    {
      id: 9,
      title: "Empower Series",
      date: "2025-04-29",
      img: img1,
      description: "Growth hacking techniques that boost your startup's user base rapidly.",
      link: "https://www.youtube.com/watch?v=-4nBFy4SJK4",
    },
    {
      id: 10,
      title: "Empower Series",
      date: "2025-04-30",
      img: img4,
      description: "Grow your brand presence through smart social media tactics.",
      link: "https://www.youtube.com/watch?v=3w3QSrq4Rho",
    },
    {
      id: 11,
      title: "Support Schemes",
      date: "2025-04-20",

      img: img4,
      description: "5 Government Schemes That Can Help Women Entrepreneurs Boost Their Businesses In India.",
      link: "https://www.youtube.com/watch?v=7hM_H5jVciE",
    },
  ];
  
  const recordedWebinars = [
    { id: 1,
      title: "Marketing Trends of 2025",
      category: "Marketing",
      description:
        "Discover emerging trends shaping the future of marketing.",
      link: "https://www.youtube.com/watch?v=ZvChhHNTz1g",img: img1 },
    { id: 2,
      title: "Intellectual Property Essentials",
      category: "Legal Compliance",
      description: "Learn and understand how IP protects your business.",
      link: "https://www.youtube.com/watch?v=NrW7mt8gHmI",
      img: img3,},
    { id: 3,
      title: "Tax Planning for Startups",
      category: "Financial Planning",
      description: "Plan your startup finances to ensure tax compliance and savings.",
      link: "https://www.youtube.com/watch?v=oL6EvSJAVqc",
      img: img2, },
      {id: 4,
      title: "Technology",
        category: "Technology",
        description:
          "Discover emerging trends shaping the future of marketing.",
        link: "https://www.youtube.com/watch?v=ZvChhHNTz1g",img: img9 },
        {id: 5,
          title: "Leadership Skills",
          category: "Leadership Skills",
          description:
            "Discover emerging trends shaping the future of marketing.",
          link: "https://www.youtube.com/watch?v=ZvChhHNTz1g",img: img10 },
  ];

  const categories = [
    "All",
    "Marketing",
    "Legal Compliance",
    "Financial Planning",
    "Technology",
    "Leadership Skills",
  ];

  const filteredWebinars = recordedWebinars.filter(
    (webinar) =>
      (categoryFilter === "All" || !categoryFilter || webinar.category === categoryFilter) &&
      webinar.title.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const loopedWebinars = [...filteredWebinars];


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
        <h2 className="upcoming">Empower Series</h2>
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
                      {/* <p className="card-mentor">Mentor: {event.mentor}</p> */}
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

      <div className="recorded">
        <h2>Recorded Webinars</h2>
        <input
          type="text"
          placeholder="Search webinars..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="search-input"
        />
   {filteredWebinars.length > 0 ? (
          <div className="marquee-wrapper">
            <Marquee gradient={false} speed={80} pauseOnHover={true}>
              {loopedWebinars.map((webinar, index) => (
                <div key={`${webinar.id}-${index}`} className="card">
                  <div className="card-inner">
                    <div className="card-front">
                      <a href={webinar.link} target="_blank" rel="noopener noreferrer">
                        <div className="img-container">
                          <img className="card-img" src={webinar.img} alt={webinar.title} />
                          <div className="play-overlay">
                            <i className="play-icon">▶</i>
                          </div>
                        </div>
                      </a>
                      <h3 className="card-title">{webinar.title}</h3>
                      <p className="card-mentor">{webinar.category}</p>
                    </div>
                    <div className="card-back">
                      <p className="card-description">{webinar.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        ) : (
          <p className="no-results">No webinars match your search.</p>
        )}
      </div>
    </div>
  );
};

export default TrainingAndWebinars;