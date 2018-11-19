import React from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';
import Inspector from 'react-inspector';
import { css } from 'emotion';

const flexContainer = {
  display: 'flex',
  justifyContent: 'center',
};

const RequestPane = () => {
  return (
    <Row>
      <Col md={6}>
        <Form>
          <FormGroup>
            <Label for="js-property-path">Property Path</Label>
            <Input id="js-property-path" />
          </FormGroup>
          <FormGroup>
            <Label for="js-value-path">Value at Path</Label>
            <Input id="js-value-path" value="some value" disabled />
          </FormGroup>
          <FormGroup>
            <Label for="transformations">Transformations</Label>
            <Typeahead
              menuId="transformations"
              multiple
              clearButton
              emptyLabel="No transformations available"
              options={['trim', 'toLower', 'stripCurrency']}
            />
          </FormGroup>
          <FormGroup>
            <Label for="js-transformed-value">Transformed Value</Label>
            <Input id="js-transformed-value-path" value="SOME VALUE" disabled />
          </FormGroup>
        </Form>
      </Col>
      <Col md={6}>
        <div className={css(flexContainer)}>
          <Inspector
            data={{ test: { foo: 'bar' } } }
            expandLevel={4}
          />
        </div>
      </Col>
    </Row>
  );
};

export default RequestPane;
