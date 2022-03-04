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
            <div className="buttons-container">
                <button><Link to='/login'>Login</Link></button>
                <button><Link to='/'>Sign Up</Link></button>
            </div>
        </nav>
    )
}

export default Navigation;