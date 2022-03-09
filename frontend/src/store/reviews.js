import { csrfFetch } from "./csrf";

const GET_REVIEWS = '/api/reviews/:businessId';
const CREATE_REVIEW = '/api/reviews/:businessId/CREATE'

//actions
const getReviews = (reviews) => {
  return {
    type: GET_REVIEWS,
    reviews
  }
};

const createReview = (review) => {
  return {
    type: CREATE_REVIEW,
    review
  }
}



//thunks

//getallreviews
export const getStoreReviews = () => async dispatch => {
  const response = await csrfFetch(`/api/reviews/`);
  if (response.ok) {
    const reviews = await response.json();
    dispatch(getReviews(reviews));
    return reviews;
  }
  return response;
}


//createReview
export const addReview = (businessId, review) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${businessId}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(review)
  });

  console.log('create review', response);
  if (response.ok) {
    const data = await response.json();
    console.log('new review:', data);
    dispatch(createReview(data));
    return data;
  }

  return response;
}


//helper functions
const sortList = (reviews) => {
  return reviews.sort((reviewA, reviewB) => {
    return reviewA.rating - reviewB.rating;
  }).map((review) => review);
};

const initialState = { reviews: [] };

const reviewReducer =  (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case GET_REVIEWS: {
      const allReviews = {};
      action.reviews.forEach(review => {
        allReviews[review.id] = review;
      });
      return {
        ...allReviews,
        ...state,
        reviews: sortList(action.reviews)
      };
    }
    default:
      return state;
  }
}

export default reviewReducer;
