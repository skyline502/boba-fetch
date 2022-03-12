import { useState, useEffect } from 'react';
import Image from '../ImageDetails';
import { addOneImage, getAllImages } from '../../store/images';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const ImagesContainer = ({ businessId }) => {
  const [form, setForm] = useState('hide-form');
  const [showForm, setShowForm] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);

  const sessionUser = useSelector(state => state.session.user)
  const currentImages = useSelector(state => state.images);
  const allImages = currentImages.images;

  const images = allImages.filter(image => image.businessId === businessId);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllImages());
  }, [dispatch])

  useEffect(() => {
    if (showForm) {
      setForm('show-form');
    } else {
      setForm('hide-form');
    }
  }, [showForm]);

  const onSubmit = async e => {
    e.preventDefault();

    const image = { businessId, userId: sessionUser.id, title, description, imgUrl };

    let newImage = await dispatch(addOneImage(image))
      .catch(async res => {
        const data = await res.json();
        if (data && data.errors) {
          setValidationErrors(data.errors);
        }
      });

    if (newImage) {
      setValidationErrors([]);
      dispatch(getAllImages());
      setTitle('');
      setDescription('');
      setImgUrl('');
      setForm('hide-form');
      return;
    }

  }

  return (
    <div className="images-modal-box">
      {validationErrors.map(error => (
        <li style={{color: 'red', fontWeight: 'bolder'}} key={error}>{error}</li>
      ))}
      <div className='add-img-box'>
        {sessionUser && (
          <>
            <div className="add-img-form">
              <button className='add-image-btn' onClick={() => setShowForm(!showForm)}>Add Image</button>
              <form onSubmit={onSubmit} className={`add-image-form ${form}`}>
                <input
                  type='text'
                  placeholder='title'
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
                <input
                  type='text'
                  placeholder='description'
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
                <input
                  type='url'
                  placeholder='enter image url'
                  value={imgUrl}
                  onChange={e => setImgUrl(e.target.value)}
                />
                <button type="submit">submit</button>
              </form>
            </div>
          </>
        )}
      </div>
      <div className='images-container'>
        {images.map(image => (
          <div className="str-img-box" key={image.id}>
            <Image image={image} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImagesContainer;
