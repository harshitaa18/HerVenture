import React, { useEffect,useState } from 'react';
import MainHeader from '../../Components/MainHeader/MainHeader';
import Testimonials from '../../Components/Testimonials/Testimonials';
import Faqs from '../../Components/Faqs/Faqs';
import Explore from '../../Components/Explore/Explore';
//import FeatureCards from '../../Components/Feature-card/FeatureCard';
import Feedback from '../../Components/Feedback/Feedback';
import Fab from '@mui/material/Fab';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import './home.css'; 

function Homepage() {
  const [openFeedback, setOpenFeedback] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when the component mounts
  }, []);

  return (
    <div>
      <MainHeader /> 
      <Explore />
      {/* <FeatureCards/> */}
      <Testimonials />
      <Faqs />
      <Fab 
        color="primary" 
        aria-label="feedback" 
        onClick={() => setOpenFeedback(true)}
        className="feedback-fab">
        <AccessibilityNewIcon />
      </Fab>
      <Feedback open={openFeedback} onClose={() => setOpenFeedback(false)} />
    </div>
  );
}

export default Homepage;
