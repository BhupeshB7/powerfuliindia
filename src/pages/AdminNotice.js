import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AdminNoticeList from './AdminNoticeList';
import AdminNoticeForm from './AdminNoticeForm';
import { Alert } from 'react-bootstrap';

function AdminNotice() {
  const [notices, setNotices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    fetch('https://mlm-production.up.railway.app/api/notice/v1')
      .then((response) => response.json())
      .then((data) => setNotices(data));
  }, []);

  const addNotice = (text) => {
    fetch('https://mlm-production.up.railway.app/api/notice/v1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
      .then((response) => response.json())
      .then((data) => {
        setNotices([data, ...notices]);
        setSuccessMessage('Message sent successfully!');
        handleCloseModal();
      });
  };

  const deleteNotice = (id) => {
    fetch(`https://mlm-production.up.railway.app/api/notice/notice/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        setNotices(notices.filter((notice) => notice._id !== id));
      });
  };

  return (
    <div>
      {/* <h6 className='text-warning'>Message</h6> */}
      <Button variant='primary' onClick={handleShowModal} >Add Message</Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Message</Modal.Title>
          
        </Modal.Header>
        <Modal.Body>
        {successMessage && (
            <Alert className="alert alert-success mt-3" dismissible>{successMessage}</Alert>
          )}
          <AdminNoticeForm onSubmit={addNotice} />
           <AdminNoticeList notices={notices} onDelete={deleteNotice} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminNotice;
