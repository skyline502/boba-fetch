import { csrfFetch } from "./csrf";
import { Redirect } from "react-router-dom";

const GET_LIST = '/api/businesses/GET_LIST';

const getList = (list) => {
  return {
    type: GET_LIST,
    list
  }
};


export const getBusinesses = () => async dispatch => {
  const response = await csrfFetch('/api/businesses');
  console.log('getBusiness res:', response)
  if (response.ok) {
    const list = await response.json();
    dispatch(getList(list));
    console.log('business list: ', list)
    return list;
  }

  return response;
}

const sortList = (list) => {
  return list.sort((businessA, businessB) => {
    return businessA.zipCode - businessB.zipCode;
  }).map((business) => business);
};

const initialState = { businesses: [] };

const businessReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_LIST: {
      const allBusinesses = {};
      action.list.forEach(business => {
        allBusinesses[business.id] = business;
      });
      return {
        ...allBusinesses,
        ...state,
        businesses: sortList(action.list)
      };
    }
    default:
      return state;
  }
};

export default businessReducer;
