import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

const propTypes = {
  onClick: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  functionTypeKey: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

const styles = {};

class Modal extends React.PureComponent {
  // TODO: text for submit form
  // TODO: text for error
  // TODO: text for save changes

  render() {
    return (
      <div>
        {/* implement modal here */}
      </div>
    );
  }
}


Modal.propTypes = propTypes;
export default injectSheet(styles)(Modal);
