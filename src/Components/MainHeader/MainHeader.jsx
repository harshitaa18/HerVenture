import {Link} from 'react-router-dom'
import Header from '../Assets/new ladki.jpg';
import "./MainHeader.css";
import post from '../Assets/post.webp'
const MainHeader = () => {
    return (
      <div className='header'>
        <img src={post} alt="" />
      </div>
    )
  }
  
  export default MainHeader 