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
      <div className='profile-body'>
        <div className='profile-page-header'>
          <h1>Welcome to Boba Fetch!</h1>
        </div>
        <img src="/images/baby-yoda-eggs.gif" />
        <div className="profile-header">
          <h4>Welcome to the site: {sessionUser.username}</h4>
          <p>UserId: {sessionUser.id}</p>
        </div>
      </div>
      <div className='shop-list'>
        {list.map(shop => (
          <div key={shop.id}>
            <h2>{shop.name}</h2>
            <img src={shop.businessImg} style={{width: 200}}/>
            <h6>{shop.address}</h6>
            <h6>{shop.city}, {shop.state} {shop.zipCode}</h6>
            <p>{shop.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BusinessList;
