import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, FormFeedback, Button, InputGroup, InputGroupAddon } from 'reactstrap';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tooltip from '../Tooltip';
import RequiredIcon from '../RequiredIcon';


const withCustomization = (InputComponent) => {
  class DecoratedInput extends React.PureComponent {
    render() {
      const { id, required, label, hint, ...other } = this.props;

      return (
        <FormGroup>
          <Label for={id}>{label}</Label>
          {required && <RequiredIcon />}
          {hint && <Tooltip id={`${id}-tooltip`} text={hint} />}
          <InputGroup>
            <InputComponent {...Object.assign({ id }, other)} />
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
          <FormFeedback>{`${label} is required`}</FormFeedback>
        </FormGroup>
      );
    }
  }

  DecoratedInput.propTypes = {
    id: PropTypes.string.isRequired,
    required: PropTypes.bool,
    label: PropTypes.string.isRequired,
    hint: PropTypes.string,
  };

  DecoratedInput.defaultProps = {
    required: false,
    hint: '',
  };

  return DecoratedInput;
};

export default withCustomization;
