import {Link} from 'react-router-dom'
import imgHeader from '../images/new ladki.jpg';

const MainHeader = () => {
    return (
      <header className="main_header">
        <div className="container main_header-container">
            <div className="main_header-left">
            <h4>#Inspiring the world</h4>
            <h1>Join the legends</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Porro beatae excepturi ea dolor? Soluta, ratione!</p>
            <Link to="/Mentorship" className='main-header_btn lg'>Get Started</Link>
            </div>

            <div className="main_header-right">
                  <div className="main_header-circle"></div>  
                  <div className="main_header-image">
                    <img src={imgHeader} alt="MainHeader Image" className='circle-img' />
                  </div>
                </div>
        </div>
      </header>
    )
  }
  
  export default MainHeader 