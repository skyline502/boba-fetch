import { csrfFetch } from "./csrf";

const GET_REVIEWS_FOR_STORE = '/api/reviews/:businessId';

//actions
const getReviews = (reviews) => {
  return {
    type: GET_REVIEWS_FOR_STORE,
    reviews
  }
};




//thunks
export const getStoreReviews = (businessId) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${businessId}`);
  if (response.ok) {
    const reviews = await response.json();
    dispatch(getReviews(reviews));
    return reviews;
  }
  return response;
}

const sortList = (reviews) => {
  return reviews.sort((reviewA, reviewB) => {
    return reviewA.rating - reviewB.rating;
  }).map((review) => review);
};

const initialState = { reviews: [] };

const reviewReducer =  (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case GET_REVIEWS_FOR_STORE: {
      newState = {...state};
      newState.reviews = [...action.reviews];
      return newState;
    }
    default:
      return state;
  }
}

export default reviewReducer;
