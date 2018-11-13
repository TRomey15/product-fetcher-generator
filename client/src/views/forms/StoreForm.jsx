import React from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  Form,
  FormGroup,
  Label,
  FormFeedback,
} from 'reactstrap';
import RequiredIcon from '../RequiredIcon';

const StoreForm = ({ storeLabel, productPageUrl }) => (
  <Form id="store-information-form" noValidate>
    <FormGroup>
      <Label for="store-label">
        Store Label
        <RequiredIcon />
      </Label>
      <Input id="store-label" value={storeLabel} />
      <FormFeedback>Please provide a valid store label.</FormFeedback>
    </FormGroup>
    <FormGroup>
      <Label for="product-page-url" type="url">
        Product Page URL
        <RequiredIcon />
      </Label>
      <Input id="product-page-url" value={productPageUrl} />
      <FormFeedback>Please provide a valid Product Page URL.</FormFeedback>
    </FormGroup>
  </Form>
);

StoreForm.propTypes = {
  storeLabel: PropTypes.string,
  productPageUrl: PropTypes.string,
};

StoreForm.defaultProps = {
  storeLabel: '',
  productPageUrl: '',
};

export default StoreForm;
