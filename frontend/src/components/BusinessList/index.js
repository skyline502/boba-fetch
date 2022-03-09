import './BusinessList.css';
import { getBusinesses } from '../../store/businesses';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteBusinessModal from '../DeleteBusiness';
import { getStoreReviews, addReview } from '../../store/reviews';

const BusinessList = () => {
  const sessionUser = useSelector(state => state.session.user);
  const shops = useSelector(state => state.businesses);
  const reviews = useSelector(state => state.reviews);

  const dispatch = useDispatch();
  const list = shops.businesses;
  const [selectedShop, setSelectedShop] = useState(shops.businesses[0]);
  const [selectedId, setSelectedId] = useState('');
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState('');
  const [message, setMessage] = useState('Welcome to Boba Fetch!');
  const [validationErrors, setValidationErrors] = useState([]);
  const shop = list.find(shop => shop.id === selectedId);
  const AllReviews = reviews.reviews;

  const shopReviews = AllReviews.filter(review => review.businessId === selectedId);

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

  const onSubmit = async (e) => {
    e.preventDefault();
    const newReview = { userId: sessionUser.id, businessId: selectedId, rating, review };
    console.log('newReview', newReview)
    setValidationErrors([]);

    let submission = await dispatch(addReview(selectedId, newReview))
      .catch(async res => {
        console.log('res....', res)
        const data = await res.json();
        console.log(data, 'what is the data...');
        if (data && data.errors) {
          setValidationErrors(data.errors);
        }
      });


    if (submission) {
      dispatch(getStoreReviews());
      setRating(1);
      setReview('');
    }

  }

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
              <Link to={`/businesses/${selectedShop.id}/edit`}><button onClick={() => dispatch(getBusinesses())} className="edit-button">Edit</button></Link>
              <DeleteBusinessModal businessId={selectedShop.id} />
            </div> : <></>
          }
          <h4>{selectedShop.address}</h4>
          <h4>{selectedShop.city}, {selectedShop.state} {selectedShop.zipCode}</h4>
          <h4>Phone: ({selectedShop.phone.split('').slice(0, 3)}) {selectedShop.phone.split('').slice(3, 6)}-{selectedShop.phone.split('').slice(6)}</h4>
          <p style={{ fontWeight: 'lighter' }}>{selectedShop.description}</p>
          <div className='reviews-box'>
            <div className='reviews-box-header'>
              <h1>Reviews</h1>
              <div>
                {sessionUser && selectedShop.ownerId !== sessionUser.id && (
                  <div className='review-form-container'>
                    <div className='review-errors'>
                      <ul>
                        {validationErrors.map(error => (
                          <li style={{color:'red', fontWeight: 'bolder'}} key={error}>{error}</li>
                        ))}
                      </ul>
                    </div>
                    <form className='review-form' onSubmit={onSubmit}>
                      <select
                        value={rating}
                        onChange={e => setRating(e.target.value)}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      <textarea
                        value={review}
                        onChange={e => setReview(e.target.value)}
                        name="review"
                        placeholder='Please Leave a Review'
                      ></textarea>
                      <button type="submit" className='add-review'>Add Review</button>
                    </form>
                  </div>
                )}
              </div>
            </div>
            {shopReviews.length > 0 ? shopReviews.map(review => (
              <div className='review-box' key={review.id}>
                <div className='review-profile'>
                  <img className='review-profile-img' src={review.User.profileImg ? review.User.profileImg : '/images/baby-yoda-eggs.gif'} />
                  <h6>{review.User.username}</h6>
                </div>
                <div className='review-content'>
                  <img src={`/images/${review.rating}.png`}></img>
                  <h6>Posted on {review.createdAt.split('-').slice(0, 2).join(' ')}</h6>
                  <p>{review.review}</p>
                </div>
              </div>
            )) : <h1>no reviews yet!</h1>}
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
