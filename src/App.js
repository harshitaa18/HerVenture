import {Routes,Route, BrowserRouter} from 'react-router-dom'
import Homepage from './Pages/Homepage/Homepage'
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Faqs from './Pages/Faqs/Faqs';
import AboutUs from './Pages/AboutUs/AboutUs';
import ContactUs from './Pages/ContactUs/ContactUs';
import Mentorship from './Pages/Mentorship/TrainingAndWebinars.jsx';


function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path='/aboutUs' element = {<AboutUs/>}/>
          <Route path='/contact' element = {<ContactUs/>}/>
          <Route path='/faqs' element = {<Faqs/>}/>
          <Route path='/mentorship' element = {<Mentorship/>}/>
        </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
