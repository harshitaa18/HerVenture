import {Routes,Route, BrowserRouter} from 'react-router-dom'
import "./i18n";
import Homepage from './Pages/Homepage/Homepage'
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import AboutUs from './Pages/AboutUs/AboutUs';
import Login from './Pages/ExplorePage/LoginOrSignup/Login';
import Mentorship from './Pages/Mentorship/TrainingAndWebinars';
import Policy from './Pages/Policy/Policy';
import UserDashboard from './Components/Dashboard/Dashboard';
import FundingPage from './Pages/ExplorePage/Landowner/Landowner';
import InvestorDetails from './Pages/ExplorePage/Entrepreneur/Entreprenuer';
import Signup from './Pages/ExplorePage/LoginOrSignup/Signup'
import Profile from './Pages/ExplorePage/profile'
import EntrepreneurSignup from './Pages/ExplorePage/Entrepreneur/EntrepreneurialSignup';
import SkilledLaborSignup from './Pages/ExplorePage/Skilledlabour/SkilledSignup';
import SupplierSignup from './Pages/ExplorePage/Supplier/SupplierSignup';
import LandOwnerSignup from './Pages/ExplorePage/Landowner/LandownerSignup';

function App() {

  return (
    <>
      <BrowserRouter>
      { <Navbar/> }
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path='/aboutUs' element = {<AboutUs/>}/>
          <Route path='/login' element = {<Login/>}/>
          <Route path="/signup/entrepreneur" element={<EntrepreneurSignup />} />
        <Route path="/signup/skilled-labor" element={<SkilledLaborSignup />} />
        <Route path="/signup/land-owner" element={<LandOwnerSignup />} />
        <Route path="/signup/supplier" element={<SupplierSignup />} />
          <Route path='/signup' element= {<Signup/>}/>
          <Route path='/mentorship' element = {<Mentorship/>}/>
          <Route path='/policy' element = {<Policy/>}/>
          <Route path='/profile' element = {<Profile/>}/>
          <Route path="/dashboard" element={<UserDashboard/>} />
        <Route path="/funding" element={<FundingPage />} />
        <Route path="/investor/:id" element={<InvestorDetails />} />
        </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
