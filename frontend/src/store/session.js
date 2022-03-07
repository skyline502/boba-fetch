import { csrfFetch } from "./csrf";
import { Redirect } from "react-router-dom";

const SET_SESSION_USER = '/api/session/SET_SESSION_USER';
const REMOVE_SESSION_USER = 'api/session/REMOVE_SESSION_USER';

const setSessionUser = user => {
  return {
    type: SET_SESSION_USER,
    user
  };
};

const removeSessionUser = () => {
  return {
    type: REMOVE_SESSION_USER,
  };
};

//login user thunk action
export const loginUser = (user) => async dispatch => {
  const { credential, password } = user;

  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });

  const data = await response.json();
  dispatch(setSessionUser(data.user));
  return response;
}

//get current user thunk
export const restoreUser = (user) => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setSessionUser(data.user));
  return response;
};

//sign up thunk action
export const signUp = (user) => async dispatch => {
  const { username, email, password, profileImg } = user;
  const response = await csrfFetch('/api/users', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ username, email, password, profileImg })
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setSessionUser(data.user));
    return (response);
  }
  return response;
}

//logout user thunk action
export const logOut = () => async dispatch => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });

  dispatch(removeSessionUser());
  return response;
}

//REDUCER FUNCTION
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_SESSION_USER: {
      newState = { ...state }
      newState.user = action.user;
      return newState;
    }
    case REMOVE_SESSION_USER: {
      newState = { ...state }
      newState.user = null;
      return newState;
    }
    default:
      return state;
  }
};

export default sessionReducer;
