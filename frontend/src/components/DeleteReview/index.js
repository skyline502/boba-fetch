import DeleteReview from './DeleteReview';
import { useState } from 'react';
import Modal from "../../context/Modal";
import './DeleteReview.css';

const DeleteReviewModal = ({reviewId}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="delete-review-button"
        onClick={() => setShowModal(true)}
      >
        Delete
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteReview reviewId= {reviewId}/>
        </Modal>
      )
      }
    </>
  )
}

export default DeleteReviewModal;
