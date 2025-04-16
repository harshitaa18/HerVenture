import React, { useState, useRef, useEffect } from "react";
import Marquee from "react-fast-marquee"
import { FaSearch } from "react-icons/fa";
import "./recordedWebinar.css";
import img1 from "../../Components/Assets/market.webp";
import img2 from "../../Components/Assets/property.jpg";
import img3 from "../../Components/Assets/tax.webp";
import img4 from "../../Components/Assets/tech.png";
import img5 from "../../Components/Assets/leader.jpg";
import img6 from "../../Components/Assets/market101.jpeg";
import img7 from "../../Components/Assets/market_social.jpeg";
import img8 from "../../Components/Assets/market_aff.png";
import img9 from "../../Components/Assets/legal.webp";
import img10 from "../../Components/Assets/download1.jpeg";
import img11 from "../../Components/Assets/invest.jpeg";
import img12 from "../../Components/Assets/insurance.png";
import img13 from "../../Components/Assets/risk.jpeg";
import img14 from "../../Components/Assets/role.png";
import img15 from "../../Components/Assets/benefits.jpeg";
import img16 from "../../Components/Assets/comm.jpeg";
import img17 from "../../Components/Assets/stratergy.jpeg";
import img18 from "../../Components/Assets/dimensions.png";
import img20 from "../../Components/Assets/compliance.jpg";
import img22 from "../../Components/Assets/comp.jpg";
import img21 from "../../Components/Assets/law.jpg";
import img23 from "../../Components/Assets/finance.jpg";
import img24 from "../../Components/Assets/technology.jpg";
import img25 from "../../Components/Assets/technology1.png";
import img26 from "../../Components/Assets/leader3.jpg";
const RecordedWebinars = () => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [shouldScroll, setShouldScroll] = useState(false);

  
  const containerRef = useRef(null);
  const contentRef = useRef(null);

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
      img: img1,
    },
    {
      id: 2,
      title: "Intellectual Property Essentials",
      category: "Legal Compliance",
      description: "Learn and understand how IP protects your business.",
      link: "https://www.youtube.com/watch?v=NrW7mt8gHmI",
      img: img2,
    },
    {
      id: 3,
      title: "Tax Planning for Startups",
      category: "Financial Planning",
      description:
        "Plan your startup finances to ensure tax compliance and savings.",
      link: "https://www.youtube.com/watch?v=oL6EvSJAVqc",
      img: img3,
    },
    {
      id: 4,
      title: "Technology",
      category: "Technology",
      description: "Discover emerging trends shaping the future of marketing.",
      link: "https://www.youtube.com/watch?v=ZvChhHNTz1g",
      img: img4,
    },
    {
      id: 5,
      title: "Leadership Skills",
      category: "Leadership Skills",
      description: "Discover emerging trends shaping the future of marketing.",
      link: "https://www.youtube.com/watch?v=ZvChhHNTz1g",
      img: img5,
    },
    {
      id: 6,
      title: "Marketing 101",
      category: "Marketing",
      description: "Discover emerging trends shaping the future of marketing.",
      link: "https://www.youtube.com/watch?v=ZvChhHNTz1g",
      img: img6,
    },
    {
      id: 7,
      title: "Social Media Marketing",
      category: "Marketing",
      description: "Discover emerging trends shaping the future of marketing.",
      link: "https://www.youtube.com/watch?v=ZvChhHNTz1g",
      img: img7,
    },
    {
      id: 8,
      title: "Affiliate Marketing",
      category: "Marketing",
      description: "Discover emerging trends shaping the future of marketing.",
      link: "https://www.youtube.com/watch?v=ZvChhHNTz1g",
      img: img8,
    },
    {
      id: 9,
      title: "What is Legal Compliance",
      category: "Legal Compliance",
      description: "Discover emerging trends shaping the future of marketing.",
      link: "https://www.youtube.com/watch?v=ZvChhHNTz1g",
      img: img9,
    },
    {
      id: 10,
      title: "Business Management",
      category: "Legal Compliance",
      description: "Discover emerging trends shaping the future of marketing.",
      link: "https://www.google.com/imgres?q=legal%20and%20regulatory%20compliance%20in%20entrepreneurship&imgurl=https%3A%2F%2Fi.ytimg.com%2Fvi%2FOos2hMSrPXM%2Fmaxresdefault.jpg&imgrefurl=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DOos2hMSrPXM&docid=Q_xAHcf-ADvFJM&tbnid=uEOxrOqs0RgzWM&vet=12ahUKEwjfmtn-ytSMAxWyzDgGHQxKISwQM3oECEgQAA..i&w=1280&h=720&hcb=2&ved=2ahUKEwjfmtn-ytSMAxWyzDgGHQxKISwQM3oECEgQAA",
      img: img10,
    },
    {
      id: 11,
      title: "Investment Planninng",
      category: "Financial Planning",
      description: "Discover emerging trends shaping the future of marketing.",
      link: "https://www.google.com/imgres?q=legal%20and%20regulatory%20compliance%20in%20entrepreneurship&imgurl=https%3A%2F%2Fi.ytimg.com%2Fvi%2FOos2hMSrPXM%2Fmaxresdefault.jpg&imgrefurl=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DOos2hMSrPXM&docid=Q_xAHcf-ADvFJM&tbnid=uEOxrOqs0RgzWM&vet=12ahUKEwjfmtn-ytSMAxWyzDgGHQxKISwQM3oECEgQAA..i&w=1280&h=720&hcb=2&ved=2ahUKEwjfmtn-ytSMAxWyzDgGHQxKISwQM3oECEgQAA",
      img: img11,
    },
    {
      id: 12,
      title: "Insurance Planninng",
      category: "Financial Planning",
      description: "Discover emerging trends shaping the future of marketing.",
      link: "https://www.google.com/imgres?q=legal%20and%20regulatory%20compliance%20in%20entrepreneurship&imgurl=https%3A%2F%2Fi.ytimg.com%2Fvi%2FOos2hMSrPXM%2Fmaxresdefault.jpg&imgrefurl=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DOos2hMSrPXM&docid=Q_xAHcf-ADvFJM&tbnid=uEOxrOqs0RgzWM&vet=12ahUKEwjfmtn-ytSMAxWyzDgGHQxKISwQM3oECEgQAA..i&w=1280&h=720&hcb=2&ved=2ahUKEwjfmtn-ytSMAxWyzDgGHQxKISwQM3oECEgQAA",
      img: img12,
    },
    {
      id: 13,
      title: "Risk Management",
      category: "Financial Planning",
      description: "Discover emerging trends shaping the future of marketing.",
      link: "https://www.google.com/imgres?q=legal%20and%20regulatory%20compliance%20in%20entrepreneurship&imgurl=https%3A%2F%2Fi.ytimg.com%2Fvi%2FOos2hMSrPXM%2Fmaxresdefault.jpg&imgrefurl=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DOos2hMSrPXM&docid=Q_xAHcf-ADvFJM&tbnid=uEOxrOqs0RgzWM&vet=12ahUKEwjfmtn-ytSMAxWyzDgGHQxKISwQM3oECEgQAA..i&w=1280&h=720&hcb=2&ved=2ahUKEwjfmtn-ytSMAxWyzDgGHQxKISwQM3oECEgQAA",
      img: img13,
    },
    {
      id: 14,
      title: "Role of Technology",
      category: "Technology",
      description: "Discover emerging trends shaping the future of marketing.",
      link: "https://www.google.com/imgres?q=legal%20and%20regulatory%20compliance%20in%20entrepreneurship&imgurl=https%3A%2F%2Fi.ytimg.com%2Fvi%2FOos2hMSrPXM%2Fmaxresdefault.jpg&imgrefurl=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DOos2hMSrPXM&docid=Q_xAHcf-ADvFJM&tbnid=uEOxrOqs0RgzWM&vet=12ahUKEwjfmtn-ytSMAxWyzDgGHQxKISwQM3oECEgQAA..i&w=1280&h=720&hcb=2&ved=2ahUKEwjfmtn-ytSMAxWyzDgGHQxKISwQM3oECEgQAA",
      img: img14,
    },
    {
      id: 15,
      title: "Benefits of Technology",
      category: "Technology",
      description: "Discover emerging trends shaping the future of marketing.",
      link: "https://www.google.com/imgres?q=legal%20and%20regulatory%20compliance%20in%20entrepreneurship&imgurl=https%3A%2F%2Fi.ytimg.com%2Fvi%2FOos2hMSrPXM%2Fmaxresdefault.jpg&imgrefurl=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DOos2hMSrPXM&docid=Q_xAHcf-ADvFJM&tbnid=uEOxrOqs0RgzWM&vet=12ahUKEwjfmtn-ytSMAxWyzDgGHQxKISwQM3oECEgQAA..i&w=1280&h=720&hcb=2&ved=2ahUKEwjfmtn-ytSMAxWyzDgGHQxKISwQM3oECEgQAA",
      img: img15,
    },
    {
      id: 16,
      title: "Improve you Communication",
      category: "Leadership Skills",
      description: "Discover emerging trends shaping the future of marketing.",
      link: "https://www.google.com/imgres?q=legal%20and%20regulatory%20compliance%20in%20entrepreneurship&imgurl=https%3A%2F%2Fi.ytimg.com%2Fvi%2FOos2hMSrPXM%2Fmaxresdefault.jpg&imgrefurl=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DOos2hMSrPXM&docid=Q_xAHcf-ADvFJM&tbnid=uEOxrOqs0RgzWM&vet=12ahUKEwjfmtn-ytSMAxWyzDgGHQxKISwQM3oECEgQAA..i&w=1280&h=720&hcb=2&ved=2ahUKEwjfmtn-ytSMAxWyzDgGHQxKISwQM3oECEgQAA",
      img: img16,
    },
    {
      id: 17,
      title: "Stratergize your Business",
      category: "Leadership Skills",
      description: "Discover emerging trends shaping the future of marketing.",
      link: "https://www.google.com/imgres?q=legal%20and%20regulatory%20compliance%20in%20entrepreneurship&imgurl=https%3A%2F%2Fi.ytimg.com%2Fvi%2FOos2hMSrPXM%2Fmaxresdefault.jpg&imgrefurl=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DOos2hMSrPXM&docid=Q_xAHcf-ADvFJM&tbnid=uEOxrOqs0RgzWM&vet=12ahUKEwjfmtn-ytSMAxWyzDgGHQxKISwQM3oECEgQAA..i&w=1280&h=720&hcb=2&ved=2ahUKEwjfmtn-ytSMAxWyzDgGHQxKISwQM3oECEgQAA",
      img: img17,
    },
    {
      id: 18,
      title: "Dimensions of Leadership",
      category: "Leadership Skills",
      description: "Discover emerging trends shaping the future of marketing.",
      link: "https://www.google.com/imgres?q=legal%20and%20regulatory%20compliance%20in%20entrepreneurship&imgurl=https%3A%2F%2Fi.ytimg.com%2Fvi%2FOos2hMSrPXM%2Fmaxresdefault.jpg&imgrefurl=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DOos2hMSrPXM&docid=Q_xAHcf-ADvFJM&tbnid=uEOxrOqs0RgzWM&vet=12ahUKEwjfmtn-ytSMAxWyzDgGHQxKISwQM3oECEgQAA..i&w=1280&h=720&hcb=2&ved=2ahUKEwjfmtn-ytSMAxWyzDgGHQxKISwQM3oECEgQAA",
      img: img18,
    },
    {
      id: 19,
      title: "Marketing on a Budget",
      category: "Marketing",
      description: "Discover emerging trends shaping the future of marketing.",
      link: "https://www.youtube.com/watch?v=ZvChhHNTz1g",
      img: img7,
    },
    {
      id: 20,
      title: "GST Registration",
      category: "Legal Compliance",
      description: "Learn and understand how IP protects your business.",
      link: "https://www.youtube.com/watch?v=NrW7mt8gHmI",
      img: img20,
    },
    {
      id: 21,
      title: "Labor Law Compliance",
      category: "Legal Compliance",
      description: "Learn and understand how IP protects your business.",
      link: "https://www.youtube.com/watch?v=NrW7mt8gHmI",
      img: img21,
    },
    {
      id: 22,
      title: "Trademark & IP Protection",
      category: "Legal Compliance",
      description: "Learn and understand how IP protects your business.",
      link: "https://www.youtube.com/watch?v=NrW7mt8gHmI",
      img: img22,
    },
    {
      id: 23,
      title: "Budgeting & Forecasting",
      category: "Financial Planning",
      description:
        "Plan your startup finances to ensure tax compliance and savings.",
      link: "https://www.youtube.com/watch?v=oL6EvSJAVqc",
      img: img23,
    },
    {
      id: 24,
      title: "Customer & Inventory Management",
      category: "Technology",
      description: "Discover emerging trends shaping the future of marketing.",
      link: "https://www.google.com/imgres?q=legal%20and%20regulatory%20compliance%20in%20entrepreneurship&imgurl=https%3A%2F%2Fi.ytimg.com%2Fvi%2FOos2hMSrPXM%2Fmaxresdefault.jpg&imgrefurl=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DOos2hMSrPXM&docid=Q_xAHcf-ADvFJM&tbnid=uEOxrOqs0RgzWM&vet=12ahUKEwjfmtn-ytSMAxWyzDgGHQxKISwQM3oECEgQAA..i&w=1280&h=720&hcb=2&ved=2ahUKEwjfmtn-ytSMAxWyzDgGHQxKISwQM3oECEgQAA",
      img: img24,
    },
    {
      id: 25,
      title: "Digital Presence (Website & Social Media)",
      category: "Technology",
      description: "Discover emerging trends shaping the future of marketing.",
      link: "https://www.google.com/imgres?q=legal%20and%20regulatory%20compliance%20in%20entrepreneurship&imgurl=https%3A%2F%2Fi.ytimg.com%2Fvi%2FOos2hMSrPXM%2Fmaxresdefault.jpg&imgrefurl=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DOos2hMSrPXM&docid=Q_xAHcf-ADvFJM&tbnid=uEOxrOqs0RgzWM&vet=12ahUKEwjfmtn-ytSMAxWyzDgGHQxKISwQM3oECEgQAA..i&w=1280&h=720&hcb=2&ved=2ahUKEwjfmtn-ytSMAxWyzDgGHQxKISwQM3oECEgQAA",
      img: img25,
    },
    {
      id: 26,
      title: "Decision-Making",
      category: "Leadership Skills",
      description: "Discover emerging trends shaping the future of marketing.",
      link: "https://www.youtube.com/watch?v=ZvChhHNTz1g",
      img: img26,
    },
  ];

  const filteredWebinars = recordedWebinars.filter(
    (webinar) =>
      (categoryFilter === "All" || !categoryFilter || webinar.category === categoryFilter) &&
      webinar.title.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const loopedWebinars = [...filteredWebinars];

  useEffect(() => {
    const checkOverflow = () => {
      if (!containerRef.current || !contentRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const contentWidth = contentRef.current.scrollWidth;
      setShouldScroll(contentWidth > containerWidth);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [filteredWebinars]);

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
          <div className="marquee-wrapper" ref={containerRef}>
            {shouldScroll ? (
              <Marquee gradient={false} speed={80} pauseOnHover={true}>
                <div className="marquee-content" ref={contentRef} style={{ display: "flex", gap: "1rem" }}>
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
                </div>
              </Marquee>
            ) : (
              <div className="marquee-static" ref={contentRef} style={{ display: "flex", gap: "1rem" }}>
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
              </div>
            )}
          </div>
        ) : (
          <p className="no-results">No webinars match your search.</p>
        )}
      </div>
    </div>
  );
};

export default RecordedWebinars;