import { NavLink, Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../store/session';
import ProfileButton from "../Profile";
import './Navigation.css';

const Navigation = () => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    let sessionLinks;

    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <div className="buttons-container">

                <Link to='/login'><button className="log-in">Login</button></Link>
                <Link to='/signup'><button className="sign-up">Sign Up</button></Link>
            </div>
        );
    }

    return (
        <nav className="nav-bar">
            <div className="logo">
                <h3>Boba fetch!</h3>
                <NavLink to='/'>
                    <img src="/images/Icon.png"></img>
                </NavLink>
            </div>
            <div className="search">
                <input type='text'></input>
                <img src='/images/search.png' className="search-img"></img>
            </div>
            <div className="session-box">
                {sessionLinks}
            </div>
        </nav>
    )
}

export default Navigation;
