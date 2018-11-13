import React from 'react';
import {
  Row,
  Col,
  Input,
  Form,
  FormGroup,
  Label,
  Button,
} from 'reactstrap';
import { css } from 'emotion';
import Tooltip from '../Tooltip';
import RequiredIcon from '../RequiredIcon';
import withTooltip from '../hoc/withTooltip';
import hints from '../../hints';

const CustomInput = withTooltip(Input);

export default class SchemaForm extends React.Component {
  render() {
    // const { productObservation } = this.props;

    return (
      <Form id="schema-form" noValidate>
        <Row form>
          <Col md={6}>
            <CustomInput
              id="schema-version"
              label="Schema Version"
              value="4.0.0"
              required
            />
          </Col>
          <Col md={6}>
            <CustomInput
              id="vim-version"
              label="VIM Version"
              value="1.0.0"
            />
          </Col>
        </Row>
        <CustomInput
          id="variant-id"
          label="Variant ID"
          hint={hints.variantId}
          required
        />
        <CustomInput
          id="parent-id"
          label="Parent ID"
          hint={hints.parentId}
          required
        />
        <CustomInput
          id="canonical-url"
          label="Canonical URL"
          hint={hints.canonicalUrl}
          required
        />
        <FormGroup tag="fieldset">
          <Label>
            Is Canonical?
            <RequiredIcon />
            <Tooltip id="is-canonical-url" hint={hints.isCanonicalUrl} />
          </Label>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" checked />{' '}Yes</Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" />{' '}No</Label>
          </FormGroup>
        </FormGroup>
        <CustomInput
          id="product-title"
          label="Title"
        />
        <CustomInput
          id="brand"
          label="Brand"
        />
        <CustomInput
          id="product-description"
          type="textarea"
          label="Description"
          hint={hints.description}
        />
        <CustomInput
          id="product-ext-description"
          type="textarea"
          label="Extended Description"
          hint={hints.extendedDescription}
        />
        <Row form>
          <Col md={4}>
            <CustomInput
              id="current-price"
              type="number"
              label="Current Price"
              required
            />
          </Col>
          <Col md={4}>
            <CustomInput
              id="list-price"
              label="List Price"
              hint={hints.listPrice}
              required
            />
          </Col>
          <Col md={4}>
            <CustomInput
              id="currency"
              label="Currency"
              hint={hints.currency}
              required
              value="USD"
            />
          </Col>
        </Row>

        <div id="control-buttons" className={css({ marginTop: '30px' })}>
          <Button type="button" color="success" className="float-right">
            Analyze
          </Button>
        </div>
      </Form>
    );
  }
}
