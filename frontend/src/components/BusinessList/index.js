import './BusinessList.css';
import { getBusinesses } from '../../store/businesses';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const BusinessList = () => {
  const sessionUser = useSelector(state => state.session.user);
  const shops = useSelector(state => state.businesses);
  const dispatch = useDispatch();
  const list = shops.businesses;
  const [selectedShop, setSelectedShop] = useState(shops.businesses[0]);
  const [selectedId, setSelectedId] = useState('');

  console.log('selected: ', selectedShop);
  console.log('selectedId:', selectedId);
  useEffect(() => {
    const shop = list.find(shop => shop.id === selectedId);
    setSelectedShop(shop);
  }, [selectedId])


  useEffect(() => {
    dispatch(getBusinesses());
    setSelectedShop(list[0]);
  }, [dispatch]);

  let selected;

  if (selectedShop) {
    selected = (
      <div className='selected-shop'>
        <img src={selectedShop.businessImg} style={{ width: 400 }} />
        <div className="selected-shop-info">
          <h1>{selectedShop.name}</h1>
          <h4>{selectedShop.address}</h4>
          <h4>{selectedShop.city}, {selectedShop.state} {selectedShop.zipCode}</h4>
          <h4>Phone: ({selectedShop.phone.split('').slice(0, 3)}) {selectedShop.phone.split('').slice(3, 6)}-{selectedShop.phone.split('').slice(6)}</h4>
          <p style={{ fontWeight: 'lighter' }}>{selectedShop.description}</p>
        </div>
      </div>
    );
  } else {
    selected = (
      <div className='selected-shop'>
        <div className='shop-header'>
          <h1>Welcome to Boba Fetch!</h1>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className='shop-list-container'>
        {selected}
        <div className='shop-list'>
          {list.map(shop => (
            <div key={shop.id} className="shop-box">
              <img
                src={shop.businessImg}
                style={{ width: 200 }}
              />
              <div className='shop-info'>
                <h2>{shop.name}</h2>
                <h6>{shop.address}</h6>
                <h6>{shop.city}, {shop.state} {shop.zipCode}</h6>
                <h6>Phone: ({shop.phone.split('').slice(0, 3)}) {shop.phone.split('').slice(3, 6)}-{shop.phone.split('').slice(6)}</h6>
                <div style={{display:'flex', justifyContent:'center', width: '100%'}}>
                  <button
                    onClick={() => setSelectedId(shop.id)}
                    className="more-info-button">
                    Info
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default BusinessList;
