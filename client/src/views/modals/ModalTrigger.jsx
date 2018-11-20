import React from 'react';
import PropTypes from 'prop-types';
import { Button, InputGroup, InputGroupAddon } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const ModalTrigger = ({ visible, children, onClick }) => {
  return visible ? (
    <InputGroup key>
      {React.Children.only(children)}
      <InputGroupAddon addonType="append">
        <Button
          type="button"
          disabled={false}
          size="sm"
          outline
          color="success"
          onClick={onClick}
        >
          <FontAwesomeIcon icon={faCheck} />
        </Button>
      </InputGroupAddon>
    </InputGroup>
  ) : React.Children.only(children);
};

ModalTrigger.propTypes = {
  visible: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

ModalTrigger.defaultProps = {
  visible: false,
  onClick: () => {},
};

export default ModalTrigger;
