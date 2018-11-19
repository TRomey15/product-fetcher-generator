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
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Tooltip from '../Tooltip';
import RequiredIcon from '../RequiredIcon';
import CustomInput from '../CustomInput';
import CustomFieldList from '../CustomFieldList';
import SecondaryImageUrlList from '../SecondaryImageUrlList';
// import AdditionalProductList from '../AdditionalProductList';
import hints from '../../hints';

const contentPadding = {
  padding: '15px',
};

const GET_PRODUCT_OBSERVATION = gql`
    {
        productObservation  @client {
            schemaVersion
            vimVersion
        }
    }
`;

const UPDATE_PRODUCT_OBSERVATION = gql`
    mutation updateProductObservation($data: ProductObservation!) {
        updateProductObservation(data: $data) @client {
            id
        }
    }
`;

const groupTitle = { textDecoration: 'underline' };

export default class SchemaForm extends React.Component {
  render() {
    const { activeTab } = this.props;

    return (
      <Mutation mutation={UPDATE_PRODUCT_OBSERVATION}>
        {updateProductObservation => (
          <Query query={GET_PRODUCT_OBSERVATION}>
            {({ data: { productObservation } }) => (
              <Form id="schema-form" noValidate>
                <TabContent activeTab={activeTab}>
                  {/* Persistent Fields */}
                  <TabPane tabId="1" className={css(contentPadding)}>
                    <Row form>
                      <Col md={6}>
                        <CustomInput
                          id="schema-version"
                          label="Schema Version"
                          value={productObservation.schemaVersion}
                          onChange={(e) => {
                            updateProductObservation({
                              variables: {
                                data: { ...productObservation, schemaVersion: e.target.value },
                              },
                            });
                          }}
                          required
                        />
                      </Col>
                      <Col md={6}>
                        <CustomInput
                          id="vim-version"
                          label="VIM Version"
                          value={productObservation.vimVersion}
                          onChange={(e) => {
                            updateProductObservation({
                              variables: {
                                data: { ...productObservation, vimVersion: e.target.value },
                              },
                            });
                          }}
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
                        clearButton
                        newSelectionPrefix="Add keyword: "
                        emptyLabel=""
                        options={[]}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="keywords">Categories</Label>
                      <Typeahead
                        menuId="categories"
                        allowNew
                        multiple
                        clearButton
                        newSelectionPrefix="Add category: "
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
                        clearButton
                        selectHintOnEnter
                        emptyLabel=""
                        options={['ISPO', 'CS', 'TPS', 'DIGITAL', 'CUZ', 'ATCP']}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input type="checkbox" />{' '}
                          Is Imprint?
                        </Label>
                        <Tooltip id="is-imprint" text={hints.imprint} />
                      </FormGroup>
                    </FormGroup>
                    <CustomInput
                      id="primary-img-url"
                      label="Primary Image URL"
                      required
                    />
                    <SecondaryImageUrlList />
                    <Row form>
                      <Col md={6}>
                        <CustomInput
                          id="rating-count"
                          type="number"
                          min={0}
                          label="Number of Ratings"
                        />
                      </Col>
                      <Col md={6}>
                        <CustomInput
                          id="rating-value"
                          type="number"
                          min={1}
                          max={100}
                          label="Rating Value"
                          hint={hints.ratingValue}
                        />
                      </Col>
                    </Row>
                  </TabPane>
                  {/* Non-Persistent Fields */}
                  <TabPane tabId="2" className={css(contentPadding)}>
                    <CustomInput
                      id="quantity-in-stock"
                      type="number"
                      label="Quantity In Stock"
                    />
                    <CustomInput
                      id="quantity-required"
                      type="number"
                      label="Quantity Required"
                    />
                    <CustomInput
                      id="quantity-allowed"
                      type="number"
                      label="Quantity Allowed"
                      hint={hints.quantityAllowed}
                    />
                    <CustomInput
                      id="quantity-increment"
                      type="number"
                      label="Quantity Increment"
                      hint={hints.quantityIncrement}
                    />
                    <FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input type="checkbox" />{' '}
                          Is Final Sale?
                        </Label>
                      </FormGroup>
                    </FormGroup>
                    <CustomInput
                      id="deals"
                      label="Deals"
                      hint={hints.deals}
                    />
                  </TabPane>
                  {/* Custom Fields */}
                  <TabPane tabId="3" className={css(contentPadding)}>
                    <p className={css(groupTitle)}>Product Details</p>
                    <CustomFieldList />
                    <p className={css(groupTitle)}>Store Extra Info</p>
                    <CustomFieldList />
                  </TabPane>
                </TabContent>
                <div id="control-buttons" className={css({ marginTop: '30px' })}>
                  <Button type="button" color="success" className="float-right">
                    Analyze
                  </Button>
                </div>
              </Form>
            )}
          </Query>
        )}
      </Mutation>
    );
  }
}

SchemaForm.propTypes = {
  activeTab: PropTypes.string.isRequired,
};
