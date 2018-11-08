import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const styles = {
  blue: {},
};

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

class ModalView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState((state) => {
      return { modal: state.quantity };
    });
  }

  render() {
    const { classes, closeModal, functionTypeKey, saveChanges } = this.props;
    const modalType = displayType[functionTypeKey] || {};
    const title = modalType.title || '';
    const description = modalType.description || '';

    return (
      <div>
        <Modal isOpen={this.props.showModal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
          <ModalBody className={classes.blue}>{description}</ModalBody>
          <ModalFooter>
            {functionTypeKey !== 'save' ? (
              <Button size="sm" color="danger" onClick={saveChanges}>
                Confirm
              </Button>
            ) : (
              <span />
            )}{' '}
            <Button size="sm" color="secondary" onClick={closeModal}>
              Close / Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalView.propTypes = {
  classes: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  functionTypeKey: PropTypes.string.isRequired,
  saveChanges: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
};
export default injectSheet(styles)(ModalView);
