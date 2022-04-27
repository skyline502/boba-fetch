import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteImg, getAllImages } from '../../store/images';
import { useHistory } from 'react-router-dom';

const DeleteConfirmation = ({imageId}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllImages());
  }, [dispatch])

  const onSubmit = async e => {
    e.preventDefault();
    let deleted = await dispatch(deleteImg(imageId));

    if (deleted) {
      dispatch(getAllImages());
    }
  }

  return (
    <div className='delete-img-container'>
      <form onSubmit={onSubmit} className='delete-img'>
        <p style={{ fontWeight: 'bolder' }}>Are you sure you want to Delete this Image?</p>
        <div className='yes-no-buttons'>
          <button type="submit" className='yes-button'>Yes</button>
        </div>
      </form>
    </div>
  )
}

export default DeleteConfirmation;
