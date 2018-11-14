import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Input,
  Form,
  FormGroup,
  Label,
  Button,
  TabPane,
  TabContent,
} from 'reactstrap';
import { css } from 'emotion';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';
import Tooltip from '../Tooltip';
import RequiredIcon from '../RequiredIcon';
import withTooltip from '../hoc/withTooltip';
import hints from '../../hints';

const contentPadding = {
  padding: '15px',
};

const CustomInput = withTooltip(Input);

export default class SchemaForm extends React.Component {
  render() {
    const { activeTab } = this.props;

    return (
      <Form id="schema-form" noValidate>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1" className={css(contentPadding)}>
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
            <FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" />{' '}
                  Is Canonical?
                </Label>
                <RequiredIcon />
                <Tooltip id="is-canonical" text={hints.isCanonical} />
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
            <FormGroup>
              <Label for="keywords">Keywords</Label>
              <Typeahead
                menuId="keywords"
                allowNew
                multiple
                newSelectionPrefix="Add keyword: "
                emptyLabel=""
                options={[]}
              />
            </FormGroup>
            <FormGroup>
              <Label for="product-states">Product States</Label>
              <Tooltip id="product-states" text={hints.productStates} />
              <Typeahead
                menuId="product-states"
                multiple
                emptyLabel=""
                options={['ISPO', 'CS', 'TPS', 'DIGITAL', 'CUZ', 'ATCP']}
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" />{' '}
                Is Imprint?
              </Label>
              <Tooltip id="is-imprint" text={hints.imprint} />
            </FormGroup>
          </TabPane>
          <TabPane tabId="2">
            NonPersistentFields
          </TabPane>
          <TabPane tabId="3">
            CustomFields
          </TabPane>
        </TabContent>
        <div id="control-buttons" className={css({ marginTop: '30px' })}>
          <Button type="button" color="success" className="float-right">
            Analyze
          </Button>
        </div>
      </Form>
    );
  }
}

SchemaForm.propTypes = {
  activeTab: PropTypes.string.isRequired,
};
