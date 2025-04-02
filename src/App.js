import {Routes,Route, BrowserRouter} from 'react-router-dom'
import "./i18n";
import Homepage from './Pages/Homepage/Homepage'
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import AboutUs from './Pages/AboutUs/AboutUs';
import Login from './Pages/ExplorePage/Login/Login';
import Mentorship from './Pages/Mentorship/TrainingAndWebinars';
import Policy from './Pages/Policy/Policy';
import UserDashboard from './Components/Dashboard/Dashboard';
import ExplorePage from './Pages/ExplorePage/ExplorePage';
import FundingPage from './Pages/ExplorePage/Landowner/Landowner';
import InvestorDetails from './Pages/ExplorePage/Entrepreneur/Entreprenuer';

function App() {

  return (
    <>
      <BrowserRouter>
      { <Navbar/> }
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path='/aboutUs' element = {<AboutUs/>}/>
          <Route path='/login' element = {<Login/>}/>
          <Route path='/mentorship' element = {<Mentorship/>}/>
          <Route path='/policy' element = {<Policy/>}/>
          <Route path="/dashboard" element={<UserDashboard/>} />
          <Route path='/explore' element = {<ExplorePage/>}/>
        <Route path="/funding" element={<FundingPage />} />
        <Route path="/investor/:id" element={<InvestorDetails />} />
        </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
