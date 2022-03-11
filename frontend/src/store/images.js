import { csrfFetch } from "./csrf";

const GET_IMAGES = '/api/images';
const ADD_IMAGE = '/api/images';

//actions
const getImages = (images) => {
  return {
    type: GET_IMAGES,
    images
  }
};

const addImage = (image) => {
  return {
    type: ADD_IMAGE,
    image
  }
};




//thunks

//getAllImages
export const getAllImages = () => async dispatch => {
  const response = await csrfFetch('/api/images/');
  if (response.ok) {
    const images = await response.json();
    console.log('any images....', images)
    dispatch(getImages(images));
    return images;
  }
  return response;
}

//addImage
export const addOneImage = (image) => async dispatch => {
  const response = await csrfFetch(`/api/images`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(image)
  });

  if (response.ok) {
    const image = await response.json();
    dispatch(addImage(image));
    return image;
  }
  return response;
}

const sortList = (images) => {
  return images.sort((imageA, imageB) => {
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
