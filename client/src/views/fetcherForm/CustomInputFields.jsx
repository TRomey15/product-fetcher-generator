import React from 'react';
// import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { Input, FormGroup, Col } from 'reactstrap';
// import plusSign from '../../images/plus_sign_30px.png';

const propTypes = {
  // classes: propTypes.object.isRequired,
  attributes: PropTypes.array.isRequired,
  field: PropTypes.string.isRequired,
  handleCustomInput: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,

};

const CustomInputFields = ({ attributes, field, index, handleCustomInput }) => {
  return (
    <Col md={6}>
      <FormGroup key={ field + index }>
        <span> Key: </span>
        <Input name={ field } placeholder="KEY" value={attributes[0] && attributes[0][0]} onChange={(e) => { handleCustomInput(e, field); } } />
        <span> Value: </span>
        <Input name={ `${field}_value` } placeholder="VALUE" value={attributes[0] && attributes[0][0]} onChange={(e) => { handleCustomInput(e, field); } } />
      </FormGroup>
    </Col>
  );
};

CustomInputFields.propTypes = propTypes;
export default CustomInputFields;
