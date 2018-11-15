import React from 'react';
import { Row, Col, Input, FormGroup, Label } from 'reactstrap';

export default class CustomFieldInputs extends React.PureComponent {
  render() {
    return (
      <Row form>
        <Col md={5}>
          <FormGroup>
            <Label>Key</Label>
            <Input />
          </FormGroup>
        </Col>
        <Col md={7}>
          <FormGroup>
            <Label>Value</Label>
            <Input />
          </FormGroup>
        </Col>
      </Row>
    );
  }
}
