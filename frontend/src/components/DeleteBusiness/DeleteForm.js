import './DeleteBusiness.css';
import { useHistory, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteBusiness, getBusinesses } from '../../store/businesses';
import './DeleteBusiness.css';

const DeleteBusiness = ({ businessId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async e => {
    e.preventDefault();
    let deleted = await dispatch(deleteBusiness(businessId));



    if (deleted) {
      dispatch(getBusinesses());
      history.push('/message');
    }
  }

  return (
    <div className='delete-form-container'>
      <form onSubmit={onSubmit} className='delete-form'>
        <p style={{ fontWeight: 'bolder' }}>Are you sure you want to Delete this Business?</p>
        <div className='yes-no-buttons'>
          <button type="submit" className='yes-button'>Yes</button>
        </div>
      </form>
    </div>
  )
};

export default DeleteBusiness;
