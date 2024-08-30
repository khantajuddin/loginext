import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { UserContext } from './UserContext';

const EditModal = ({ show, handleModal }) => {
    const { selectedUser, setUserData } = useContext(UserContext);
    const { register, handleSubmit, reset, formState: { errors, isSubmitted } } = useForm();

    // Reset form values whenever selectedUser changes
    useEffect(() => {
        if (selectedUser) {
            reset({
                name: selectedUser.name || '',
                email: selectedUser.email || '',
                phone: selectedUser.phone || '',
                website: selectedUser.website || '',
            });
        }
    }, [selectedUser, reset]);

    const handleClose = () => {
        handleModal(false);
    };

    const onSubmit = (data) => {
        setUserData(prevData =>
            prevData.map(user =>
                user.id === selectedUser.id ? { ...user, ...data } : user
            )
        );
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} aria-labelledby="edit-user-modal">
            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Modal.Header closeButton>
                    <Modal.Title id="edit-user-modal">Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            autoFocus
                            {...register("name", { required: 'Name is required' })}
                            isInvalid={!!errors.name}
                            isValid={isSubmitted && !errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            {...register("email", {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Invalid email address'
                                }
                            })}
                            isInvalid={!!errors.email}
                            isValid={isSubmitted && !errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="tel"
                            {...register("phone", { required: 'Phone number is required' })}
                            isInvalid={!!errors.phone}
                            isValid={isSubmitted && !errors.phone}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.phone?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Website</Form.Label>
                        <Form.Control
                            type="url"
                            {...register("website", { required: 'Website is required' })}
                            isInvalid={!!errors.website}
                            isValid={isSubmitted && !errors.website}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.website?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" type="submit">Save Changes</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default EditModal;
