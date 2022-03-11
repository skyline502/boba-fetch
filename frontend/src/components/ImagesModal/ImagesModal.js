const ImagesContainer = ({images}) => {
  return (
    <div className="images-container">
      <h1>Images</h1>
      {images.map(image => (
        <img key={image.id} src={image.imgUrl} />
      ))}
    </div>
  )
}

export default ImagesContainer;
