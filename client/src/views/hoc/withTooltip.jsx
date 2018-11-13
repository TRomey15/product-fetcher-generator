import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, FormFeedback } from 'reactstrap';
import Tooltip from '../Tooltip';
import RequiredIcon from '../RequiredIcon';

const withTooltip = (InputComponent) => {
  class InputWithTooltip extends React.PureComponent {
    render() {
      const { id, required, label, hint, ...rest } = this.props;

      return (
        <FormGroup>
          <Label for={id}>{label}</Label>
          {required && <RequiredIcon />}
          {hint && <Tooltip id={`${id}-tooltip`} hint={hint} />}
          <InputComponent {...Object.assign({ id }, rest)} />
          <FormFeedback>{`${label} is required`}</FormFeedback>
        </FormGroup>
      );
    }
  }

  InputWithTooltip.propTypes = {
    id: PropTypes.string.isRequired,
    required: PropTypes.bool,
    label: PropTypes.string.isRequired,
    hint: PropTypes.string,
  };

  InputWithTooltip.defaultProps = {
    required: false,
    hint: '',
  };

  return InputWithTooltip;
};

export default withTooltip;
