import { useState, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { MdOutlineEmail, MdOutlinePhoneEnabled } from "react-icons/md";
import { IoIosGlobe, IoMdHeartEmpty, IoMdHeart, IoMdTrash } from "react-icons/io";
import { LuPenLine } from "react-icons/lu";
import { UserContext } from './UserContext';
import styles from './UserCard.module.css';

const UserCard = ({ user, setShowEditModal, setShowDeleteModal }) => {
    const { setSelectedUser } = useContext(UserContext);
    const [isLiked, setIsLiked] = useState(false);

    const handleEditClick = () => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    const handleDeleteClick = () => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const handleLikeToggle = () => {
        setIsLiked(prev => !prev);
    };

    return (
        <Card className="mb-4">
            <div className={styles.imageContainer}>
                <Card.Img 
                    className={styles.img} 
                    variant="top" 
                    src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${user.username}&eyebrows=default&mouth=smile`} 
                    alt={`${user.name}'s avatar`}
                />
            </div>
            <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Stack gap={1}>
                    <span><MdOutlineEmail /> {user.email}</span>
                    <span><MdOutlinePhoneEnabled /> {user.phone}</span>
                    <span><IoIosGlobe /> {user.website}</span>
                </Stack>
            </Card.Body>
            <Card.Footer className={styles.footer}>
                <Button 
                    variant='link' 
                    className={`text-${isLiked ? 'danger' : 'secondary'}`} 
                    onClick={handleLikeToggle} 
                    aria-label={isLiked ? 'Unlike' : 'Like'}
                >
                    {isLiked ? <IoMdHeart /> : <IoMdHeartEmpty />}
                </Button>
                <Button 
                    variant='link' 
                    className='text-secondary' 
                    onClick={handleEditClick} 
                    aria-label='Edit user'
                >
                    <LuPenLine />
                </Button>
                <Button 
                    variant='link' 
                    className='text-secondary' 
                    onClick={handleDeleteClick} 
                    aria-label='Delete user'
                >
                    <IoMdTrash />
                </Button>
            </Card.Footer>
        </Card>
    );
};

export default UserCard;
