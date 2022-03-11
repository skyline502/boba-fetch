const ImageDetails = ({image}) => {
  return (
    <div className="image-detail-box">
      <h1>{image.title}</h1>
      <img src={image.imgUrl} />
      <p>{image.description}</p>
    </div>
  )
}

export default ImageDetails;
