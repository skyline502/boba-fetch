import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import './Message.css';

const Message = () => {
  return (
    <div className="message-container">
      <div className="message-header">
        <h1>Business Deleted Successfully!</h1>
      </div>
      <img style={{borderRadius: 15, margin: 10}} id='goodbye' src='/images/baby-yoda-grogu.gif'/>
      <NavLink to='/businesses'><button className="back-button">Go back</button></NavLink>
    </div>
  )
}

export default Message;
