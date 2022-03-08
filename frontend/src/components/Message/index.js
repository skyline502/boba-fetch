import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const Message = () => {
  return (
    <>
      <h1>Success!</h1>
      <NavLink to='/businesses'><button>Go back</button></NavLink>
    </>
  )
}

export default Message;
