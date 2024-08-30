import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { UserContext } from './UserContext';

const DeleteModal = ({ show, handleModal }) => {
    const { selectedUser, setUserData } = useContext(UserContext);

    // Handle modal close
    const handleClose = () => handleModal(false);

    // Handle delete action
    const handleDeleteClick = () => {
        setUserData(prevData => prevData.filter(user => user.id !== selectedUser.id));
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} aria-labelledby="delete-modal-title">
            <Modal.Header closeButton>
                <Modal.Title id="delete-modal-title">Delete User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete {selectedUser.name}?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="danger" onClick={handleDeleteClick}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;
