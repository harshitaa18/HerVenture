import {Routes,Route, BrowserRouter} from 'react-router-dom'
import Homepage from './Pages/Homepage/Homepage'
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Faqs from './Pages/Faqs/Faqs';
import AboutUs from './Pages/AboutUs/AboutUs';
import Login from './Pages/Login/Login';
import Mentorship from './Pages/Mentorship/TrainingAndWebinars';
import Policy from './Pages/Policy/Policy';


function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path='/aboutUs' element = {<AboutUs/>}/>
          <Route path='/login' element = {<Login/>}/>
          <Route path='/faqs' element = {<Faqs/>}/>
          <Route path='/mentorship' element = {<Mentorship/>}/>
          <Route path='/policy' element = {<Policy/>}/>
        </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
