import DeleteBusiness from "./DeleteForm";
import { useState } from 'react';
import Modal from "../../context/Modal";
import './DeleteBusiness.css';

const DeleteBusinessModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="delete-business-button"
        onClick={() => setShowModal(true)}
      >
        Delete
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteBusiness />
        </Modal>
      )


      }
    </>
  )
}
