// NameModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';

const NameModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim() !== '') {
      onSubmit(name);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Enter Your Name"
    >
      <h2>Enter Your Name</h2>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </Modal>
  );
};

export default NameModal;
