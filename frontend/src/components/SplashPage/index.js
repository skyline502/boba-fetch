import './SplashPage.css';
import { Link } from 'react-router-dom';

const SplashPage = () => {
  return (
    <div className="splash-container">
      <div className='splash-body'>
        <div className='splash-page-header'>
          <h1>Welcome to Boba Fetch!</h1>
        </div>
        <img src="/images/baby-yoda-eggs.gif" />
        <div className="splash-header">
          <h1>Have a Boba Shop?</h1>
          <h4>Grow your business faster!</h4>
          <ul>
            <li>Reach 3X more potential customers</li>
            <li>Create your business on Boba Fetch! within minutes</li>
            <li>Start advertising your business with Boba Fetch now!</li>
          </ul>
          <Link to='/signup'><button className="splash-sign-up">Sign up now for free!</button></Link>
        </div>
      </div>
    </div>

  )
};

export default SplashPage;
