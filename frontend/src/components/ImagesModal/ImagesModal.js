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

    let newImage = await dispatch(addOneImage(image));

    if (newImage) {
      setForm('hide-form');
      dispatch(getAllImages());
      return;
    }

  }

  return (
    <div className="images-container">
      <h1>Images</h1>
      {sessionUser && (
        <>
          <div className="add-img-form">
            <button onClick={() => setShowForm(!showForm)}>Add Image</button>
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
              <button type="submit" onClick={() => setForm('hide-form')}>submit</button>
            </form>
          </div>
        </>
      )}
      {images.map(image => (
        <div className="str-img-box" key={image.id}>
          <Image image={image} />
        </div>
      ))}
    </div>
  )
}

export default ImagesContainer;
