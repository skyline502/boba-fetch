import './BusinessList.css';
import { getBusinesses } from '../../store/businesses';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const BusinessList = () => {
  const sessionUser = useSelector(state => state.session.user);
  const shops = useSelector(state => state.businesses);
  const dispatch = useDispatch();

  const list = shops.businesses;

  useEffect(() => {
    dispatch(getBusinesses());
  }, [dispatch]);


  return (
    <div className='shop-list-container'>
      <div className='selected-shop'>
        <div className='shop-header'>
          <h1>Welcome to Boba Fetch!</h1>
        </div>
        <img src="/images/baby-yoda-eggs.gif" />
        <div className="profile-header">
        </div>
      </div>
      <div className='shop-list'>
        {list.map(shop => (
          <div key={shop.id} className="shop-box">
            <img src={shop.businessImg} style={{ width: 200 }} />
            <div className='shop-info'>
              <h2>{shop.name}</h2>
              <h6>{shop.address}</h6>
              <h6>{shop.city}, {shop.state} {shop.zipCode}</h6>
              <h6>Phone: ({shop.phone.split('').slice(0, 3)}) {shop.phone.split('').slice(3, 6)}-{shop.phone.split('').slice(6)}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BusinessList;
