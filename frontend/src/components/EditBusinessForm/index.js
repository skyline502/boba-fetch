import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../store/session';
import { Redirect, Link, useHistory, useParams } from 'react-router-dom';
import { editBusiness, getBusinesses } from '../../store/businesses';
import './EditBusiness.css';

const EditBusiness = ({list}) => {
  const {id} = useParams();
  const sessionUser = useSelector(state => state.session.user);
  console.log('shop list:', list);
  console.log('id: ', id)
  const shop = list[id];
  //states
  const [name, setName] = useState(shop.name);
  const [address, setAddress] = useState(shop.address);
  const [city, setCity] = useState(shop.city);
  const [state, setState] = useState(shop.state);
  const [zipCode, setZipCode] = useState(shop.zipCode);
  const [phone, setPhone] = useState(shop.phone);
  const [description, setDescription] = useState(shop.description);
  const [businessImg, setBusinessImg] = useState(shop.businessImg);
  const [validationErrors, setValidationErrors] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();



  useEffect(async () => {
    let businesses = await dispatch(getBusinesses());
    return list = businesses;
  }, [dispatch])





  const onSubmit = async e => {
    e.preventDefault();

    const ownerId = sessionUser.id;
    const business = { ownerId, name, address, city, state, zipCode, phone, description, businessImg };

    console.log('new business:', business);
    setValidationErrors([]);

    let shop = await dispatch(editBusiness(id, business))
      .catch(async res => {
        const data = await res.json();
        console.log('data;;;;;;', data)
        if (data && data.errors) {
          setValidationErrors(data.errors);
        }
      });

    console.log(shop, 'line56')

    if (shop.id) {
      history.push('/businesses');
      console.log('does this run?');
    }


  }

  if (!sessionUser) {
    return <Redirect to='/'></Redirect>
  }

  return (
    <div className='edit-business-container'>
      <form onSubmit={onSubmit} className="edit-business-form">
        <div className='edit-business-header'>
          <h1>Edit business</h1>
        </div>
        <ul>
          {validationErrors.map(error => <li style={{ color: 'red' }} key={error}>{error}</li>)}
        </ul>
        <div className='edit-business-input-fields'>
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
          <button type="submit" className='edit-shop-button'>Save Changes</button>
          <Link to='/businesses'><button className='edit-cancel-button'>Cancel</button></Link>
        </div>
      </form>
    </div>
  )
};

export default EditBusiness;
