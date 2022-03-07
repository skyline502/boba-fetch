import { csrfFetch } from "./csrf";
import { Redirect } from "react-router-dom";

const GET_LIST = '/api/businesses/GET_LIST';

const getList = (list) => {
  return {
    type: GET_LIST,
    list
  }
};


const getBusinesses = () => async dispatch => {
  const response = await csrfFetch('/api/businesses');

  if (response.ok) {
    const list = await response.json();
    dispatch(getList(list));
    return list;
  }

  return response;
}
