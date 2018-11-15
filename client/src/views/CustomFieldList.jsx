import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input, FormGroup, Label } from 'reactstrap';
import withCustomization from './hocs/withDynamicList';

const MAX_ROWS = 6;

const CustomFieldEntry = ({ isFirst }) => {
  return (
    <Row form>
      <Col md={5}>
        <FormGroup>
          {isFirst && <Label>Key</Label>}
          <Input />
        </FormGroup>
      </Col>
      <Col md={7}>
        <FormGroup>
          {isFirst && <Label>Value</Label>}
          <Input />
        </FormGroup>
      </Col>
    </Row>
  );
};

CustomFieldEntry.propTypes = {
  isFirst: PropTypes.bool,
};

CustomFieldEntry.defaultProps = {
  isFirst: true,
};

export default withCustomization(MAX_ROWS)(CustomFieldEntry);
