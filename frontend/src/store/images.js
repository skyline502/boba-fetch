import { csrfFetch } from "./csrf";

const GET_IMAGES = '/api/images/GET_IMAGES';
const ADD_IMAGE = '/api/images/ADD_IMAGES';
const DELETE_IMAGE = '/api/images/:id';

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

const deleteImage = (imageId) => {
  return {
    type: DELETE_IMAGE,
    imageId
  }
};



//thunks

//getAllImages
export const getAllImages = () => async dispatch => {
  const response = await csrfFetch('/api/images/');
  if (response.ok) {
    const images = await response.json();
    dispatch(getImages(images));
    return images;
  }
  return response;
}

//addImage
export const addOneImage = (image) => async dispatch => {
  const response = await csrfFetch(`/api/images/`, {
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

//deleteImage
export const deleteImg = (imageId) => async dispatch => {
  const response = await csrfFetch(`/api/images/${imageId}`, {
    method:'DELETE',
  });

  if (response.ok) {
    const imageId = await response.json();
    dispatch(deleteImage(imageId));
    return imageId;
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
    case ADD_IMAGE: {
      newState = {...state};
      newState[action.image.id] = action.image;
      return newState;
    }
    case DELETE_IMAGE: {
      newState = {...state};
      delete newState[action.imageId];
      return newState;
    }
    default:
      return state;
  }
};

export default imageReducer;
