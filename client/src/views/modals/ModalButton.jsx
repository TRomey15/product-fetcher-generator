import React from 'react';
import PropTypes from 'prop-types';
import { Button, InputGroup, InputGroupAddon } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const ModalButton = ({ show, children }) => {
  return show ? (
    <InputGroup key>
      {React.Children.only(children)}
      <InputGroupAddon addonType="append">
        <Button
          type="button"
          size="sm"
          outline
          color="success"
        >
          <FontAwesomeIcon icon={faCheckCircle} />
        </Button>
      </InputGroupAddon>
    </InputGroup>
  ) : React.Children.only(children);
};

ModalButton.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

ModalButton.defaultProps = {
  show: false,
};

export default ModalButton;
