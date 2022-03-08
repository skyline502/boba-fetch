import './DeleteBusiness.css';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteBusiness } from '../../store/businesses';

const DeleteBusiness = () => {
  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();

  }
  return (
    <>
    <form>
      <h1>Are you sure you want to Delete this Business?</h1>
      <button type="submit">Yes</button>
      <button onClick={}>Cancel</button>
    </form>
    </>
  )
};

export default DeleteBusiness;
