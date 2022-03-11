import { csrfFetch } from "./csrf";

const GET_IMAGES = '/api/images';

//actions
const getImages = (images) => {
  return {
    type: GET_IMAGES,
    images
  }
};


//thunks

//getAllImages
export const getAllImages = () => async dispatch => {
  const response = await csrfFetch('/api/images');
  if (response.ok) {
    const images = await response.json();
    dispatch(getImages(images));
    return images;
  }
  return response;
}

const sortList = (images) => {
  return reviews.sort((imageA, imageB) => {
    return imageA.businessId - imageB.businessId;
  }).map((image) => image);
};

const initialState = { images: [] }

const imageReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case GET_IMAGES: {
      const allImages = {};
      action.images.forEach(image => {
        allImages[image.id] = image;
      });
      return {
        ...allImages,
        ...state,
        images: sortList(action.images)
      };
    }
    default:
      return state;
  }
};

export default imageReducer;
