import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const displayType = {
  submit: {
    title: 'Are you sure you want to submit?',
    description: 'There are one or more required fields that have not been filled. Would you like to continue?',
  },
  error: {
    title: 'Error!',
    description: 'A problem has occured while submitting your data.',
  },
  save: {
    title: 'Saved!',
    description: 'Your product fetcher has been successfully saved.',
  },
};

const AlertModal = (props) => {
  const { functionTypeKey, saveChanges, showModal, closeModal } = props;
  const modalType = displayType[functionTypeKey] || {};
  const title = modalType.title || '';
  const description = modalType.description || '';
  return (
    <div>
      <Modal size="sm" isOpen={showModal}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{description}</ModalBody>
        <ModalFooter>
          {
            functionTypeKey !== 'save' ?
              <Button size="sm" color="danger" onClick={saveChanges}> Confirm </Button> :
              <span />
          }
          <Button size="sm" color="secondary" onClick={closeModal}> Close / Cancel </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

AlertModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  functionTypeKey: PropTypes.string.isRequired,
  saveChanges: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
};
export default AlertModal;
