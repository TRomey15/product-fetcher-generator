import React from 'react';
import { Row, Col, Input, FormGroup, Label } from 'reactstrap';

export default class InputRow extends React.PureComponent {
  render() {
    return (
      <Row>
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
