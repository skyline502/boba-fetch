import './BusinessList.css';
import { getBusinesses } from '../../store/businesses';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteBusinessModal from '../DeleteBusiness';
import DeleteReviewModal from '../DeleteReview';
import ImagesModal from '../ImagesModal';
import { getStoreReviews, addReview, deleteAReview } from '../../store/reviews';

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
  const [term, setTerm] = useState('');
  const [search, setSearch] = useState(false);
  const [result, setResult] = useState([]);
  const [resultBox, setResultBox] = useState('hide');
  const [averageRating, setAverageRating] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const shop = list.find(shop => shop.id === selectedId);
  const AllReviews = reviews.reviews;

  const shopReviews = AllReviews.filter(review => review.businessId === selectedId);

  const getAvg = (id) => {
    let sum = 0;
    let reviews = AllReviews.filter(review => review.businessId === id);
    if (reviews) {
      reviews.forEach(review => sum += review.rating);
      return sum / reviews.length;
    }
    return 'No reviews yet';
  }

  useEffect(() => {
    if (shopReviews) {
      let sum = 0;
      shopReviews.forEach(review => {
        sum += review.rating;
      })
      let avg = sum / shopReviews.length;
      setAverageRating(avg);
    }
  }, [selectedId, reviews, dispatch])


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

  useEffect(() => {
    let results = list.filter(shop => shop.name.toLowerCase().includes(term.toLowerCase()));
    if (results) {
      setResult(results)
    }
  }, [search, term])

  useEffect(() => {
    if (!resultBox) {
      setResultBox('show');
    }
  }, [term, search])

  //test search
  console.log('searching for....', term)

  const onSubmit = async (e) => {
    e.preventDefault();
    const newReview = { userId: sessionUser.id, businessId: selectedId, rating, review };
    setValidationErrors([]);

    let submission = await dispatch(addReview(selectedId, newReview))
      .catch(async res => {
        const data = await res.json();
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
          <h1 style={{margin: 10}}>{selectedShop.name}</h1>
          <ImagesModal />
          {sessionUser && selectedShop.ownerId === sessionUser.id ?
            <div className='delete-edit-buttons'>
              <Link to={`/businesses/${selectedShop.id}/edit`}><button onClick={() => dispatch(getBusinesses())} className="edit-button">Edit</button></Link>
              <DeleteBusinessModal businessId={selectedShop.id} />
            </div> : <></>
          }
          <div className='average-rating'>
            <h6>{averageRating ? (<img src={`/images/${Math.ceil(averageRating)}.png`} />) : 'No ratings yet!'}</h6>
          </div>
          <div className='selected-shop-details'>
            <h4>{selectedShop.address}</h4>
            <h4>{selectedShop.city}, {selectedShop.state} {selectedShop.zipCode}</h4>
            <h4>Phone: ({selectedShop.phone.split('').slice(0, 3)}) {selectedShop.phone.split('').slice(3, 6)}-{selectedShop.phone.split('').slice(6)}</h4>
            <p style={{ fontWeight: 'lighter' }}>{selectedShop.description}</p>
          </div>
          <div className='reviews-box'>
            <div className='reviews-box-header'>
              <h1>Reviews</h1>
              <div>
                {sessionUser && selectedShop.ownerId !== sessionUser.id && (
                  <div className='add-review-container'>
                    <div className='review-form-container'>
                      {validationErrors.map(error => (
                        <li key={error} style={{ color: 'red', fontWeight: 'bolder' }}>{error}</li>
                      ))}
                      <form className='review-form' onSubmit={onSubmit}>
                        <label htmlFor='rating'>How many stars?</label>
                        <img style={{ margin: 5 }} src={`/images/${rating}.png`}></img>
                        <select
                          value={rating}
                          onChange={e => setRating(e.target.value)}
                          name="rating"
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                        <textarea
                          className='review-text'
                          value={review}
                          onChange={e => setReview(e.target.value)}
                          name="review"
                          placeholder='Please Leave a Review'
                        ></textarea>
                        <button type="submit" className='add-review'>Add Review</button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {shopReviews.length > 0 ? shopReviews.map(review => (
              <div className='review-box' key={review.id}>
                <div className='review-profile'>
                  <img className='review-profile-img' src={review.User.profileImg ? review.User.profileImg : '/images/baby-yoda-eggs.gif'} />
                  <h6>{review.User.username}</h6>
                  {sessionUser && review.User.id === sessionUser.id && (
                    <DeleteReviewModal reviewId={review.id} />
                  )}
                </div>
                <div className='review-content'>
                  <img src={`/images/${review.rating}.png`}></img>
                  <h6>Posted on {review.createdAt.split('T').join(' ').slice(0, 10)}</h6>
                  <p style={{ fontWeight: 'lighter', fontSize: 12 }}>{review.review}</p>
                </div>
              </div>
            )) : <h4 className='no-reviews'>no reviews yet!</h4>}
          </div>
        </div>
      </div>
    );
  } else {
    selected = (
      <div className='selected-shop'>
        <div className='shop-header'>
          <h1>Welcome to Boba Fetch!</h1>
          <h6>Click on a store to see its information!</h6>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="search">
        <input
        type='text'
        placeholder='  ...search'
        value={term}
        name="search"
        onChange={e => setTerm(e.target.value)}
        onMouseEnter={() => setResultBox('show')}
        onClick={() => setTerm('')}
        ></input>
        <div
        className={`search-results ${resultBox}`}
        onMouseLeave={() => setResultBox('hide')}
        >
          <p style={{fontSize: 12, fontWeight:'lighter', marginTop: 0}}>search results...</p>
          {result && (
            result.map(result => (
              <h6
              key={result.id}
              className='search-result'
              onClick={() =>
                {
                  setSelectedId(result.id)
                  setTerm('');
                  setResultBox('hide');
                }}>{result.name}: {result.address}</h6>
            ))
          )}
          </div>
      </div>
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
                <h2 style={{ marginBottom: 10 }}>{shop.name}</h2>
                {getAvg(shop.id) ? <img src={`/images/${Math.ceil(getAvg(shop.id))}.png`}/> : <p style={{ color: 'red' }}>No Reviews yet!</p>}
                <h6 style={{ marginTop: 10 }}>{shop.address}</h6>
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
