import './ImageDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteImg, getAllImages } from '../../store/images';
import DeleteImageModal from '../DeleteImg';

const ImageDetails = ({image}) => {
  const sessionUser = useSelector(state => state.session.user);
  return (
    <div className="image-detail-box">
      <h1>{image.title}</h1>
      <img style={{maxHeight: 300 }}  src={image.imgUrl} />
      <p>{image.description}</p>
      {sessionUser && image.userId === sessionUser.id && (
        <DeleteImageModal imageId={image.id} />
      )}
    </div>
  )
}

export default ImageDetails;
