import { csrfFetch } from "./csrf";

const GET_REVIEWS = '/api/reviews/:businessId';
const CREATE_REVIEW = '/api/reviews/:businessId/CREATE'
const DELETE_REVIEW = '/api/reviews/:id';

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
};

const deleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId
  }
};


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

  console.log('create reviewssssss', response);
  if (response.ok) {
    const data = await response.json();
    console.log('new review:', data);
    dispatch(createReview(data));
    return data;
  }

  return response;
}

//destroyReview
export const deleteAReview = (reviewId) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteReview(reviewId));
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
    case CREATE_REVIEW: {
      newState = {...state};
      newState[action.review.id] = action.review;
      return newState;
    }
    default:
      return state;
  }
}

export default reviewReducer;
