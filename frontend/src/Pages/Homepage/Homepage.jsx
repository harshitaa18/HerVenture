import React, { useEffect } from 'react';
import MainHeader from '../../Components/MainHeader/MainHeader';
import Testimonials from '../../Components/Testimonials/Testimonials';
import Faqs from '../../Components/Faqs/Faqs';
import Explore from '../../Components/Explore/Explore';
//import FeatureCards from '../../Components/Feature-card/FeatureCard';

function Homepage() {
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
    </div>
  );
}

export default Homepage;
