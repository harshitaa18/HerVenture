import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './TrainingAndWebinar.css'; // Optional custom styles
import img1 from "../../Components/Assets/market.webp";
import RecordedWebinars from './recordedWebinar';

const TrainingAndWebinars = () => {
  const [selectedEvents, setSelectedEvents] = useState([]);

  const events = [
    {
      title: 'Workshop: Women in Leadership',
      date: '2025-04-15',
      videoPoster: img1,
      videoLink: 'https://www.youtube.com/watch?v=WCauHgLeqZc',
      description: 'A deep dive into leadership strategies for aspiring women entrepreneurs.',
    },
    {
      title: 'Marketing Mastery',
      date: '2025-04-22',
      videoPoster: 'https://via.placeholder.com/300x150.png?text=Marketing+Webinar',
      videoLink: 'https://example.com/video2',
      description: 'Grow your business with our expert-led session on marketing tactics.',
    },
    {
      title: 'Entrepreneurship Essentials',
      date: '2025-04-18',
      videoPoster: 'https://via.placeholder.com/300x150.png?text=Entrepreneurship',
      videoLink: 'https://example.com/video3',
      description: 'Discover what it takes to build a thriving startup from scratch.',
    },
    {
      title: 'Startup Success Secrets',
      date: '2025-04-25',
      videoPoster: 'https://images.unsplash.com/photo-1590650046871-92c887180603?auto=format&fit=crop&w=800&q=60',
      videoLink: 'https://example.com/video4',
      description: 'Join our webinar to uncover the strategies women entrepreneurs use to launch successful startups!',
    },
  ];

  const handleDateClick = (info) => {
    const clickedDate = info.dateStr;
    const filteredEvents = events.filter((e) => e.date === clickedDate);
    setSelectedEvents(filteredEvents);
  };

  return (
    <div className="training-webinars-container">
      <div style={{ display: 'flex', gap: '30px', padding: '20px' }}>
        {/* Calendar Section */}
        <div className="calendar-section">
          <h2 className="calendar-title">Upcoming Events</h2>
          <div className="calendar-overlay">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              dateClick={handleDateClick}
              eventDisplay="block" 
              height="500px"
            />
          </div>
        </div>

        {/* Featured Events Section */}
        <div className="featured-events-container">
  {selectedEvents.length > 0 ? (
    selectedEvents.map((event, index) => (
      <div className="featured-event-card" key={index}>
        <img src={event.videoPoster} alt={event.title} />
        <h4>{event.title}</h4>
        <p>{event.description}</p>
        <p className="featured-event-date">
          {new Date(event.date).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <a
          href={event.videoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="watch-video-button"
        >
          ▶ Watch Video
        </a>
      </div>
    ))
  ) : (
    <p style={{ color: '#888' }}>Click a date with an event to see details here.</p>
  )}
</div>
</div>

      {/* Recorded Webinars Section */}
      <RecordedWebinars />
    </div>
  );
};

export default TrainingAndWebinars;
