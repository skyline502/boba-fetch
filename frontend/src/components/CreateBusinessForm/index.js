import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../store/session';
import { Redirect, Link, useHistory } from 'react-router-dom';
import { addBusiness, getBusinesses } from '../../store/businesses';
import './CreateBusiness.css';

const CreateBusiness = () => {
  //states
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [businessImg, setBusinessImg] = useState();
  const [validationErrors, setValidationErrors] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector(state => state.session.user);
  const shops = useSelector(state => state.businesses);

  useEffect(() => {
    dispatch(getBusinesses());
  }, [dispatch])





  const onSubmit = async e => {
    e.preventDefault();

    const ownerId = sessionUser.id;
    const business = { ownerId, name, address, city, state, zipCode, phone, description, businessImg };


    setValidationErrors([]);

    let shop = await dispatch(addBusiness(business))
      .catch(async res => {
        const data = await res.json();
        if (data && data.errors) {
          setValidationErrors(data.errors);
        }
      });



    if (shop) {
      history.push('/businesses');
    }


  }

  if (!sessionUser) {
    return <Redirect to='/'></Redirect>
  }

  return (
    <div className='create-business-container'>
      <form onSubmit={onSubmit} className="create-business-form">
        <div className='create-business-header'>
          <h1>Create a business</h1>
        </div>
        <ul>
          {validationErrors.map(error => <li style={{ color: 'red' }} key={error}>{error}</li>)}
        </ul>
        <div className='create-business-input-fields'>
          <input
            type="text"
            name="name"
            placeholder='name'
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="text"
            name="address"
            placeholder='address'
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
          />
          <input
            type="text"
            name="city"
            placeholder='city'
            value={city}
            onChange={e => setCity(e.target.value)}
            required
          />
          <input
            type="text"
            name="state"
            placeholder='state'
            value={state}
            onChange={e => setState(e.target.value)}
            required
          />
          <input
            type="text"
            name="zipCode"
            placeholder='zipCode'
            value={zipCode}
            onChange={e => setZipCode(e.target.value)}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder='phone'
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
          />
          <input
            type="text"
            name="businessImg"
            placeholder='businessImg'
            value={businessImg}
            onChange={e => setBusinessImg(e.target.value)}
          />
          <textarea
            name="description"
            placeholder='description'
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          ></textarea>
          <button className='create-shop-button'>Add your Business Now</button>
          <Link to='/businesses'><button className='create-shop-cancel'>Cancel</button></Link>
        </div>
      </form>
    </div>
  )
};

export default CreateBusiness;
