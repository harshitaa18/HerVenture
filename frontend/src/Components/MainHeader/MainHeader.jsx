import { Link } from "react-router-dom";
//import HeaderImage from "../Assets/background2.jpg";
import "./MainHeader.css";
//import post from '../Assets/post.webp'
const MainHeader = () => {
  return (
    <header className="mainpage_header">
      <div className="mainpage_header-overlay">
        <div className="container mainpage_header-container">
          <div className="mainpage_header-text">
            <h4>#Inspiring the world</h4>
            <h1>Stronger Together,Bolder Forever</h1>
            <p>
            Empowering women to break barriers, lead boldly, and transform dreams into reality. <br />
             Together, let's build a future where women redefine success on their own terms.
            </p>
            <Link to="/signup" className="mainpage_header-btn lg">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
export default MainHeader;

