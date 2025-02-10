import React from 'react'
// import './home.css'
//import MainHeader from '../../Components/MainHeader/MainHeader'
import Testimonials from '../../Components/Testimonials/Testimonials';
import MainHeader from '../../Components/MainHeader/MainHeader';
import Faqs from '../../Components/Faqs/Faqs';
import Explore from '../../Components/Explore/Explore';

function Homepage() {
  return (
    <div>
      <MainHeader/>
      <Explore/>
      <Testimonials />
      <Faqs/>
    </div>
  )
}
 
export default Homepage