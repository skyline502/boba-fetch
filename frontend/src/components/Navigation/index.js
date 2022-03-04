import { NavLink, Link } from "react-router-dom"
import './Navigation.css';

const Navigation = () => {
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
            <div className="buttons-container">
                <Link to='/login'><button className="log-in">Login</button></Link>
                <Link to='/'><button className="sign-up">Sign Up</button></Link>
            </div>
        </nav>
    )
}

export default Navigation;