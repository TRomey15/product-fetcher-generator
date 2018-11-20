import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash-es';
import { FormGroup, Label, FormFeedback } from 'reactstrap';
import Tooltip from '../Tooltip';
import RequiredIcon from '../RequiredIcon';
import ModalTrigger from '../modals/ModalTrigger';

const withCustomization = (InputComponent) => {
  class DecoratedInput extends React.PureComponent {
    render() {
      const { id, required, modalEnabled, label, hint, errorMessage, onModalClick, ...other } = this.props;
      const componentId = id || kebabCase(label);

      return (
        <FormGroup>
          <Label for={componentId}>{label}</Label>
          {required && <RequiredIcon />}
          {hint && <Tooltip id={`${componentId}-tooltip`} text={hint} />}
          <ModalTrigger
            visible={modalEnabled}
            onClick={onModalClick}
          >
            <InputComponent {...Object.assign({ id }, other)} />
          </ModalTrigger>
          <FormFeedback>{errorMessage}</FormFeedback>
        </FormGroup>
      );
    }
  }

  DecoratedInput.propTypes = {
    id: PropTypes.string,
    required: PropTypes.bool,
    modalEnabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
    hint: PropTypes.string,
  };

  DecoratedInput.defaultProps = {
    id: '',
    required: false,
    modalEnabled: false,
    hint: '',
  };

  return DecoratedInput;
};

export default withCustomization;
