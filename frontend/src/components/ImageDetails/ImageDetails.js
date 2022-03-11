import './ImageDetails.css';

const ImageDetails = ({image}) => {
  return (
    <div className="image-detail-box">
      <h1>{image.title}</h1>
      <img style={{maxHeight: 300 }}  src={image.imgUrl} />
      <p>{image.description}</p>
    </div>
  )
}

export default ImageDetails;
