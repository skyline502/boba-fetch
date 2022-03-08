import { csrfFetch } from "./csrf";
import { Redirect } from "react-router-dom";

const GET_LIST = '/api/businesses/GET_LIST';
const ADD_SHOP = '/api/businesses/ADD_SHOP';
const DELETE_SHOP = '/api/business/DELETE_SHOP';


//actions

//get list of all businesses
const getList = (list) => {
  return {
    type: GET_LIST,
    list
  }
};

//add a business
const addShop = (shop) => {
  return {
    type: ADD_SHOP,
    shop
  }
};

const deleteShop = (businessId) => {
  return {
  type: DELETE_SHOP,
  businessId
  }
}



//thunks

//getBusinesses
export const getBusinesses = () => async dispatch => {
  const response = await csrfFetch('/api/businesses');
  if (response.ok) {
    const list = await response.json();
    dispatch(getList(list));
    return list;
  }

  return response;
}

//createBusiness
export const addBusiness = (shop) => async dispatch => {
  const response = await csrfFetch('/api/businesses', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(shop)
  });

  console.log('create shop:', response);
  if (response.ok) {
    const data = await response.json();
    console.log('shop data: ', data)
    dispatch(addShop(data.shop))
    return response;
  }

  return response;
}

//destroyBusiness
export const deleteBusiness = (businessId) => async dispatch => {
  const response = await csrfFetch(`/api/businesses/${businessId}`, {
    method: "DELETE",
  });

  console.log('businessId=====:', businessId);

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteShop(businessId));
    return data;
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
    case ADD_SHOP: {
      newState = {...state};
      return newState;
    }
    default:
      return state;
  }
};

export default businessReducer;
