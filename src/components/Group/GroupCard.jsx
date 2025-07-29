import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { saveData } from '../../utils/storage';
import { totalBalance } from '../../utils/calculator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';

function GroupCard({ groupName, groupMembers, groupId, totalAmount, DeleteGroup, currentUser }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  const youOwed = totalBalance(groupMembers, currentUser);
  const amountOwed = youOwed ? parseFloat(youOwed).toFixed(2) : "0.00";
  const amountText = amountOwed >= 0 ? `owes you ₹${amountOwed}` : `you owe ₹${Math.abs(amountOwed)}`;
  const colorClass = amountOwed >= 0 ? "text-success" : "text-danger";

  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/expenses/${groupId}`);
    saveData("selectedGroupId", groupId);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setSelectedGroupId(groupId);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    setShowModal(false);
    toast.success("Group deleted successfully!", { position: "top-center", autoClose:1500});
    setTimeout(() => DeleteGroup(selectedGroupId),1500)
    
  };

  return (
    <>

      <div className="col-sm-12 col-lg-6 pb-2 d-flex justify-content-center align-items-center">
      <ToastContainer />
        <div
          className="groupCard shadow-sm px-3 py-2 rounded bg-white col-11 d-flex justify-content-between align-items-center"
          onClick={handleCardClick}
          style={{ cursor: "pointer" }}
        >
          <div className="groupDetails row-gap-1 d-flex flex-column justify-content-center align-items-start">
            <h6 className="m-0">{groupName}</h6>
            <p className="m-0 fw-semibold" style={{ fontSize: '0.7rem' }}>{groupMembers.length} members</p>
            <p className="m-0 fw-semibold text-secondary" style={{ fontSize: '0.7rem' }}>
              Created by: {groupMembers[0].name}
            </p>
            {amountOwed == 0 && totalAmount >= 0 ? (
              <p
                className="m-0 fw-semibold  px-2 py-1 rounded-pill"
                style={{ fontSize: '0.8rem', backgroundColor: 'rgb(201 255 211)', color: 'darkgreen' }}
              >
                {amountOwed == 0 && totalAmount == 0 ? "No Expenses Yet" : "settled"}
              </p>
            ) : (
              <p className={`fw-semibold m-0 ${colorClass}`} style={{ fontSize: '0.8rem' }}>
                {amountText}
              </p>
            )}
          </div>
          <div className="totalAmmount d-flex flex-column justify-content-center align-items-end">
            <p className="m-0 fw-semibold" style={{ fontSize: '0.8rem' }}>₹{totalAmount} total</p>
            <button
              className="btn btn-danger p-1 mt-3"
              style={{ fontSize: '0.8rem' }}
              onClick={handleDeleteClick}
              title="Delete Group"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the group <strong>{groupName}</strong>?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleConfirmDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GroupCard;
