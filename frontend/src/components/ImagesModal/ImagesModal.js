import { useState, useEffect } from 'react';

const ImagesContainer = ({images}) => {
  const [form, setForm] = useState('hide-form');
  const [showForm, setShowForm] = useState(false);
  const [imgUrl, setImgUrl] = useState();

  useEffect(() => {
    if (showForm) {
      setForm('show-form');
    } else {
      setForm('hide-form');
    }
  }, [showForm])
  return (
    <div className="images-container">
      <h1>Images</h1>
      <div className="add-img-form">
        <button onClick={() => setShowForm(!showForm)}>Add Image</button>
        <form className={`add-image-form ${form}`}>
          <input
          type='url'
          placeholder='enter image url'
          value={imgUrl}
          onChange={e => setImgUrl(e.target.value)}
          />
          <button type="submit">submit</button>
        </form>
      </div>
      {images.map(image => (
        <div className="str-img-box" key={image.id}>
          <img src={image.imgUrl} />
        </div>
      ))}
    </div>
  )
}

export default ImagesContainer;
