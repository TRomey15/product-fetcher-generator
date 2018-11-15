import React from 'react';
import PropTypes from 'prop-types';
import { Input, FormGroup, Label } from 'reactstrap';
import withCustomization from './hocs/withDynamicList';

const MAX_ROWS = 10;

const SecondaryImageUrl = ({ isFirst }) => {
  return (
    <FormGroup>
      {isFirst && <Label>Secondary Image URLs</Label>}
      <Input />
    </FormGroup>
  );
};

SecondaryImageUrl.propTypes = {
  isFirst: PropTypes.bool,
};

SecondaryImageUrl.defaultProps = {
  isFirst: true,
};

export default withCustomization(MAX_ROWS)(SecondaryImageUrl);
