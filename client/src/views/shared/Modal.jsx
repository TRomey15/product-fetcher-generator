import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import Button from './Button.jsx';

const propTypes = {
  classes: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  functionTypeKey: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const styles = {
  modalContainer: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  mainModal: {
    position: 'fixed',
    backgroundColor: 'white',
    width: '35%',
    height: '40%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    borderRadius: '9px',
    boxShadow: '1px 2px 7px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Nanum Gothic, serif',
    flexDirection: 'column',
    alignItems: 'center',
  },
  modalHeader: {
    fontFamily: 'Fjalla One, sans-serif',
    fontSize: '25px',
    marginTop: '13%',
  },
  alignText: {
    margin: '2% 8%',
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '35%',
    flexGrow: '1',
    alignSelf: 'flex-end',
    justifyContent: 'space-evenly',
    marginBottom: '10%',
    marginRight: '12%',
  },
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

class Modal extends React.PureComponent {
  render() {
    const { closeModal, classes, functionTypeKey, onClick } = this.props;

    const modalType = displayType[functionTypeKey] || {};
    const title = modalType.title || '';
    const description = modalType.description || '';

    return (
      <div className={ classes.modalContainer }>
        <div className={ classes.mainModal }>
          <h3 className={ classes.modalHeader }>{ title }</h3>
          <p className={ classes.alignText }>{ description }</p>
          <div className={ classes.buttonRow }>
            <Button text="Cancel" onClick={ closeModal } />
            <Button text="Submit" onClick={ onClick } />
          </div>

        </div>
      </div>
    );
  }
}

Modal.propTypes = propTypes;
export default injectSheet(styles)(Modal);
