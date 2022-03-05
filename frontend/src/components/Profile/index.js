// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logOut());
  };

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
          <ul className="profile-dropdown">
            <li style={{ listStyleType: 'none' }}>{user.username}</li>
            <li style={{ listStyleType: 'none' }}>{user.email}</li>
            <li style={{ listStyleType: 'none' }}>
              <button onClick={logout} className="logout">Log Out</button>
            </li>
          </ul>
      )}
    </>
  );
}

export default ProfileButton;
