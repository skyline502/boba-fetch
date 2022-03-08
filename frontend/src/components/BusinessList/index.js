import './BusinessList.css';
import { getBusinesses } from '../../store/businesses';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteBusinessModal from '../DeleteBusiness';
import { getStoreReviews } from '../../store/reviews';

const BusinessList = () => {
  const sessionUser = useSelector(state => state.session.user);
  const shops = useSelector(state => state.businesses);
  const reviews = useSelector(state => state.reviews);

  console.log('revie2ws', reviews);

  const dispatch = useDispatch();
  const list = shops.businesses;
  const [selectedShop, setSelectedShop] = useState(shops.businesses[0]);
  const [selectedId, setSelectedId] = useState('');
  const shop = list.find(shop => shop.id === selectedId);

  console.log('onload:', list);
  useEffect(() => {
    dispatch(getBusinesses());
  }, [dispatch]);

  useEffect(() => {
    setSelectedShop(list[0]);
  }, []);

  useEffect(() => {
    dispatch(getStoreReviews());
  }, [dispatch]);

  useEffect(() => {
    setSelectedShop(shop);
  }, [selectedId])

  let selected;

  if (selectedShop) {
    selected = (
      <div className='selected-shop'>
        <div className='selected-img-box'>
          <img className='selected-shop-img' src={selectedShop.businessImg ? selectedShop.businessImg : '/images/logo.png'} />
        </div>
        <div className="selected-shop-info">
          <h1>{selectedShop.name}</h1>
          {sessionUser && selectedShop.ownerId === sessionUser.id ?
            <div className='delete-edit-buttons'>
              <Link to={`/businesses/${selectedShop.id}/edit`}><button className="edit-button">Edit</button></Link>
              <DeleteBusinessModal businessId={selectedShop.id} />
            </div> : <></>
          }
          <h4>{selectedShop.address}</h4>
          <h4>{selectedShop.city}, {selectedShop.state} {selectedShop.zipCode}</h4>
          <h4>Phone: ({selectedShop.phone.split('').slice(0, 3)}) {selectedShop.phone.split('').slice(3, 6)}-{selectedShop.phone.split('').slice(6)}</h4>
          <p style={{ fontWeight: 'lighter' }}>{selectedShop.description}</p>
        </div>
        <div className='selected-shop-gallery-reviews'>
          <div className='reviews-box'>
            <button>Reviews</button>
          </div>
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
              <div className='shop-img-box'>
                <img
                  src={shop.businessImg ? shop.businessImg : '/images/logo.png'}
                  style={{ width: 200 }}
                />
              </div>
              <div className='shop-info'>
                <h2>{shop.name}</h2>
                <h6>{shop.address}</h6>
                <h6>{shop.city}, {shop.state} {shop.zipCode}</h6>
                <h6>Phone: ({shop.phone.split('').slice(0, 3)}) {shop.phone.split('').slice(3, 6)}-{shop.phone.split('').slice(6)}</h6>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
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
