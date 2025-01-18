import React from 'react'
// import './home.css'
//import MainHeader from '../../Components/MainHeader/MainHeader'
import Testimonials from '../../Components/Testimonials/Testimonials';
import MainHeader from '../../Components/MainHeader/MainHeader';
import Faqs from '../Faqs/Faqs';

function Homepage() {
  return (
    <div>
      <MainHeader/>
      <Testimonials />
      <Faqs/>
    </div>
  )
}
 
export default Homepage