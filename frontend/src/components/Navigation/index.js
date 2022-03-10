import { NavLink, Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { logOut } from '../../store/session';
import LoginFormModal from "../LoginFormModal";
import DemoButton from "../DemoButton";
import './Navigation.css';

const Navigation = () => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [navDisplay, setNavDisplay] = useState(false);

    let sessionLinks;

    if (sessionUser) {
        sessionLinks = (
            <div className="profile">
                <div style={{ marginRight: 10 }}>Welcome back {sessionUser.username}</div>
                <img style={{ width: '40px', borderRadius: '50%' }} src={sessionUser.profileImg ? sessionUser.profileImg : '/images/baby-yoda-eggs.gif'}></img>
                <button className="logout" onClick={() => dispatch(logOut())}>Log Out</button>
            </div>
        );
    } else {
        sessionLinks = (
            <div className="buttons-container">
                <DemoButton />
                <LoginFormModal />
                <Link to='/signup'><button className="sign-up">Sign Up</button></Link>
            </div>
        );
    }

    return (
        <div className="nav-container">
            <nav className="nav-bar">
                <div className="logo">
                    <h3>Boba fetch!</h3>
                    <NavLink to='/'>
                        <img src="/images/Icon.png"></img>
                    </NavLink>
                    <NavLink to='/businesses'>
                        <button className="menu">Businesses</button>
                    </NavLink>
                    {sessionUser ? <NavLink to='/businesses/create'>
                        <button className="add-business">Add a Business</button>
                    </NavLink> : <></>}
                </div>
                <div className="session-box">
                    {sessionLinks}
                </div>
            </nav>
        </div>
    )
}

export default Navigation;
