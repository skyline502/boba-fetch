import './ImagesModal.css';
import ImagesContainer from './ImagesModal';
import { useState } from 'react';
import Modal from "../../context/Modal";


const ImagesModal = ({images, businessId}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="images-button"
        onClick={() => setShowModal(true)}
      >Images</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ImagesContainer images={images} businessId={businessId} />
        </Modal>
      )}
    </>
  );
};

export default ImagesModal;
