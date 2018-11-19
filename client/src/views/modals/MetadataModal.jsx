import React from 'react';
// import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ButtonGroup,
  Button,
} from 'reactstrap';
import { css } from 'emotion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import RequestPane from './RequestPane';

const flexContainer = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '30px',
};

const MetadataModal = () => {
  return (
    <Modal
      isOpen
      centered
      keyboard
      fade={false}
      size="lg"
      toggle={() => console.log('Toggle me')}
    >
      <ModalHeader toggle={console.log('Toggle me')}>
        Title{' '}
        <FontAwesomeIcon icon={faSignInAlt} className="text-muted" />
      </ModalHeader>
      <ModalBody>
        <div className={css(flexContainer)}>
          <ButtonGroup>
            <Button>API</Button>
            <Button>Script</Button>
            <Button>HTML</Button>
          </ButtonGroup>
        </div>
        <RequestPane />
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={console.log('Toggle me')}
        >
          Save
        </Button
        >{' '}
        <Button
          color="secondary"
          onClick={console.log('Toggle me')}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default MetadataModal;
