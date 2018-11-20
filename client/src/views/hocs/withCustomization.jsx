import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, FormFeedback } from 'reactstrap';
import Tooltip from '../Tooltip';
import RequiredIcon from '../RequiredIcon';
import ModalButton from '../modals/ModalButton';


const withCustomization = (InputComponent) => {
  class DecoratedInput extends React.PureComponent {
    render() {
      const { id, required, label, hint, ...other } = this.props;

      return (
        <FormGroup>
          <Label for={id}>{label}</Label>
          {required && <RequiredIcon />}
          {hint && <Tooltip id={`${id}-tooltip`} text={hint} />}
          <ModalButton show>
            <InputComponent {...Object.assign({ id }, other)} />
          </ModalButton>
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
