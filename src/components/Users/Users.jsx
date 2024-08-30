import React, { useState } from 'react';

import Loader from '../Loader';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EditModal from './EditModal';
import UserCard from './UserCard';
import DeleteModal from './DeleteModal';
import { UserContext } from './UserContext';
import useUsers from './useUsers';

const Users = () => {
  const { userData, setUserData, isLoading, error } = useUsers();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <UserContext.Provider value={{
      userData,
      setUserData,
      selectedUser,
      setSelectedUser,
    }}>
      <Container className='my-4'>
        <Row>
          {userData.map((user) => (
            <Col key={user.id} sm={6} md={4} xl={3}>
              <UserCard 
                user={user} 
                setShowEditModal={setShowEditModal} 
                setShowDeleteModal={setShowDeleteModal} />
            </Col>
          ))}
        </Row>
      </Container>
      {
        selectedUser && ( 
          <>
          <EditModal show={showEditModal} handleModal={setShowEditModal} />
          <DeleteModal show={showDeleteModal} handleModal={setShowDeleteModal} />
          </>
          )
      }
     
    </UserContext.Provider>
  );
}
export default Users;