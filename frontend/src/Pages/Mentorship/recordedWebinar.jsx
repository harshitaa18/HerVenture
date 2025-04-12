import React, { useState } from "react";
import Marquee from "react-fast-marquee"
import { FaSearch } from "react-icons/fa";
import "./recordedWebinar.css";

const RecordedWebinars = () => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  const categories = [
    "All",
    "Marketing",
    "Legal Compliance",
    "Financial Planning",
    "Technology",
    "Leadership Skills",
  ];

  const recordedWebinars = [
    {
      id: 1,
      title: "Marketing Trends of 2025",
      category: "Marketing",
      description: "Discover emerging trends shaping the future of marketing.",
      link: "https://www.youtube.com/watch?v=ZvChhHNTz1g",
      img: "img1.jpg",
    },
    {
      id: 2,
      title: "Intellectual Property Essentials",
      category: "Legal Compliance",
      description: "Learn and understand how IP protects your business.",
      link: "https://www.youtube.com/watch?v=NrW7mt8gHmI",
      img: "img3.jpg",
    },
    {
      id: 3,
      title: "Tax Planning for Startups",
      category: "Financial Planning",
      description:
        "Plan your startup finances to ensure tax compliance and savings.",
      link: "https://www.youtube.com/watch?v=oL6EvSJAVqc",
      img: "img2.jpg",
    },
    {
      id: 4,
      title: "Technology",
      category: "Technology",
      description: "Discover emerging trends shaping the future of marketing.",
      link: "https://www.youtube.com/watch?v=ZvChhHNTz1g",
      img: "img9.jpg",
    },
    {
      id: 5,
      title: "Leadership Skills",
      category: "Leadership Skills",
      description: "Discover emerging trends shaping the future of marketing.",
      link: "https://www.youtube.com/watch?v=ZvChhHNTz1g",
      img: "img10.jpg",
    },
  ];

  const filteredWebinars = recordedWebinars.filter(
    (webinar) =>
      (categoryFilter === "All" || !categoryFilter || webinar.category === categoryFilter) &&
      webinar.title.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const loopedWebinars = [...filteredWebinars];

  return (
    <div className="webinar-section">
      {/* Topic Categories */}
      <section className="categories-section">
        <h2 >Topic Categories</h2>
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

      {/* Search Bar */}
      <div className="recorded">
        {/* <h2>Recorded Webinars</h2> */}
        <div className="search-container">
  <FaSearch className="search-icon" />
  <input
    type="text"
    placeholder="Search webinars..."
    value={searchFilter}
    onChange={(e) => setSearchFilter(e.target.value)}
    className="search-input"
  />
</div>


        {/* Webinar Marquee */}
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

export default RecordedWebinars;
