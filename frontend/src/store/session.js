import { csrfFetch } from "./csrf";

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

//REDUCER FUNCTION
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_SESSION_USER: {
      newState = {...state}
      newState.user = action.user;
      return newState;
    }
    case REMOVE_SESSION_USER: {
      newState = {...state}
      newState.user = null;
      return newState;
    }
    default:
      return state;
  }
};

export default sessionReducer;
