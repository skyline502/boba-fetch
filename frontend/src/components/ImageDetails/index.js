import './ImageDetails.css'
import ImageDetails from './ImageDetails';
import { useState } from 'react';
import Modal from "../../context/Modal";

const Image = ({image}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <img src={image.imgUrl}
        className="images-button"
        onClick={() => setShowModal(true)}
      ></img>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ImageDetails image={image} />
        </Modal>
      )}
    </>
  );
};

export default Image;
