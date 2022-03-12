import DeleteConfirmation from './DeleteConfirmation';
import { useState } from 'react';
import Modal from "../../context/Modal";
import './DeleteConfirmation.css';

const DeleteImageModal = ({imageId}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="delete-img-button"
        onClick={() => setShowModal(true)}
      >
        Delete
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteConfirmation imageId= {imageId}/>
        </Modal>
      )
      }
    </>
  )
}

export default DeleteImageModal;
