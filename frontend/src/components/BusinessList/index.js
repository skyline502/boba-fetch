import './BusinessList.css';
import { getBusinesses } from '../../store/businesses';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const BusinessList = () => {

  const dispatch = useDispatch();
  const shops = useSelector(state => state.businesses);

  console.log(shops);

  useEffect(() => {
    dispatch(getBusinesses);
  }, []);


  return (
    <>
      <h1>Shop List</h1>
      <p></p>
    </>
  )
}

export default BusinessList;
