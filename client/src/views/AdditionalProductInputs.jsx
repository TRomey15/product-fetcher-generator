import React from 'react';
import { Row, Col, Input, FormGroup, Label } from 'reactstrap';

export default class CustomFieldsInput extends React.PureComponent {
  render() {
    return (
      <Row form>
        <Col md={5}>
          <FormGroup>
            <Label>Parent ID</Label>
            <Input />
          </FormGroup>
        </Col>
        <Col md={7}>
          <FormGroup>
            <Label>URL</Label>
            <Input />
          </FormGroup>
        </Col>
      </Row>
    );
  }
}
