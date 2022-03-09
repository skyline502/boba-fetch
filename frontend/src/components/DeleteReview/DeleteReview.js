import './DeleteReview.css';
import { useHistory, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteAReview, getStoreReviews } from '../../store/reviews';


const DeleteReview = ({ reviewId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async e => {
    e.preventDefault();
    let deleted = await dispatch(deleteAReview(reviewId));



    if (deleted) {
      dispatch(getStoreReviews());
    }
  }

  return (
    <div className='delete-form-container'>
      <form onSubmit={onSubmit} className='delete-form'>
        <p style={{ fontWeight: 'bolder' }}>Are you sure you want to Delete this Review?</p>
        <div className='yes-no-buttons'>
          <button type="submit" className='yes-button'>Yes</button>
        </div>
      </form>
    </div>
  )
};

export default DeleteReview;
