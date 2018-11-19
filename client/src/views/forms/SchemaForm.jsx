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
import { map } from 'lodash-es';
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
import MetadataModal from '../modals/MetadataModal';
import hints from '../../hints';
import { fragments } from '../../store/resolvers';

const contentPadding = {
  padding: '15px',
};

const GET_PRODUCT_OBSERVATION = gql`
    {
        productObservation  @client {
            ...SchemaFields
        }
    }
    ${fragments.schema}
`;

const UPDATE_PRODUCT_OBSERVATION = gql`
    mutation updateProductObservation($data: ProductObservation!) {
        updateProductObservation(data: $data) @client {
            ...SchemaFields
        }
    }
    ${fragments.schema}
`;

const groupTitle = { textDecoration: 'underline' };

export default class SchemaForm extends React.PureComponent {
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
                          required
                          id="schema-version"
                          label="Schema Version"
                          value={productObservation.schemaVersion}
                          onChange={(e) => {
                            updateProductObservation({
                              variables: {
                                data: { schemaVersion: e.target.value },
                              },
                            });
                          }}
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
                                data: { vimVersion: e.target.value },
                              },
                            });
                          }}
                        />
                      </Col>
                    </Row>
                    <CustomInput
                      required
                      id="variant-id"
                      label="Variant ID"
                      hint={hints.variantId}
                      value={productObservation.variantId}
                      onChange={(e) => {
                        updateProductObservation({
                          variables: {
                            data: { variantId: e.target.value },
                          },
                        });
                      }}
                    />
                    <CustomInput
                      required
                      id="parent-id"
                      label="Parent ID"
                      hint={hints.parentId}
                      value={productObservation.parentId}
                      onChange={(e) => {
                        updateProductObservation({
                          variables: {
                            data: { parentId: e.target.value },
                          },
                        });
                      }}
                    />
                    <CustomInput
                      id="product-title"
                      label="Title"
                      value={productObservation.title}
                      onChange={(e) => {
                        updateProductObservation({
                          variables: {
                            data: { title: e.target.value },
                          },
                        });
                      }}
                    />
                    <CustomInput
                      id="brand"
                      label="Brand"
                      value={productObservation.brand}
                      onChange={(e) => {
                        updateProductObservation({
                          variables: {
                            data: { brand: e.target.value },
                          },
                        });
                      }}
                    />
                    <CustomInput
                      id="product-description"
                      type="textarea"
                      label="Description"
                      hint={hints.description}
                      value={productObservation.description}
                      onChange={(e) => {
                        updateProductObservation({
                          variables: {
                            data: { description: e.target.value },
                          },
                        });
                      }}
                    />
                    <CustomInput
                      id="product-ext-description"
                      type="textarea"
                      label="Extended Description"
                      hint={hints.extendedDescription}
                      value={productObservation.extendedDescription}
                      onChange={(e) => {
                        updateProductObservation({
                          variables: {
                            data: { extendedDescription: e.target.value },
                          },
                        });
                      }}
                    />
                    <Row form>
                      <Col md={4}>
                        <CustomInput
                          required
                          id="current-price"
                          type="number"
                          label="Current Price"
                          value={productObservation.priceCurrent}
                          onChange={(e) => {
                            updateProductObservation({
                              variables: {
                                data: { priceCurrent: e.target.value },
                              },
                            });
                          }}
                        />
                      </Col>
                      <Col md={4}>
                        <CustomInput
                          required
                          id="list-price"
                          label="List Price"
                          hint={hints.listPrice}
                          value={productObservation.priceList}
                          onChange={(e) => {
                            updateProductObservation({
                              variables: {
                                data: { priceList: e.target.value },
                              },
                            });
                          }}
                        />
                      </Col>
                      <Col md={4}>
                        <CustomInput
                          required
                          id="currency"
                          label="Currency"
                          hint={hints.currency}
                          value={productObservation.currency}
                          onChange={(e) => {
                            updateProductObservation({
                              variables: {
                                data: { currency: e.target.value },
                              },
                            });
                          }}
                        />
                      </Col>
                    </Row>
                    <CustomInput
                      required
                      id="canonical-url"
                      label="Canonical URL"
                      hint={hints.canonicalUrl}
                      value={productObservation.canonicalUrl}
                      onChange={(e) => {
                        updateProductObservation({
                          variables: {
                            data: { canonicalUrl: e.target.value },
                          },
                        });
                      }}
                    />
                    <FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="checkbox"
                            value={productObservation.isCanonical}
                            onChange={(e) => {
                              updateProductObservation({
                                variables: {
                                  data: { isCanonical: e.target.checked },
                                },
                              });
                            }}
                          />{' '}
                          Is Canonical?
                        </Label>
                        <RequiredIcon />
                        <Tooltip id="is-canonical" text={hints.isCanonical} />
                      </FormGroup>
                    </FormGroup>
                    <CustomInput
                      id="upc"
                      label="UPC"
                      value={productObservation.upc}
                      onChange={(e) => {
                        updateProductObservation({
                          variables: {
                            data: { upc: e.target.value },
                          },
                        });
                      }}
                    />
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
                        selected={productObservation.keywords}
                        onChange={(selected) => {
                          updateProductObservation({
                            variables: {
                              data: { keywords: map(selected, obj => obj.label) },
                            },
                          });
                        }}
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
                        selected={productObservation.categories}
                        onChange={(selected) => {
                          updateProductObservation({
                            variables: {
                              data: { categories: map(selected, obj => obj.label) },
                            },
                          });
                        }}
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
                        selected={productObservation.productStates}
                        onChange={(selected) => {
                          updateProductObservation({
                            variables: {
                              data: { productStates: selected },
                            },
                          });
                        }}
                      />
                    </FormGroup>
                    <CustomInput
                      required
                      id="primary-img-url"
                      label="Primary Image URL"
                      value={productObservation.imageUrlPrimary}
                      onChange={(e) => {
                        updateProductObservation({
                          variables: {
                            data: { imageUrlPrimary: e.target.value },
                          },
                        });
                      }}
                    />
                    <SecondaryImageUrlList />
                    <Row form>
                      <Col md={6}>
                        <CustomInput
                          id="rating-count"
                          type="number"
                          min={0}
                          label="Number of Ratings"
                          value={productObservation.ratingCount}
                          onChange={(e) => {
                            updateProductObservation({
                              variables: {
                                data: { ratingCount: parseInt(e.target.value, 10) },
                              },
                            });
                          }}
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
                          value={productObservation.ratingValue}
                          onChange={(e) => {
                            updateProductObservation({
                              variables: {
                                data: { ratingValue: parseInt(e.target.value, 10) },
                              },
                            });
                          }}
                        />
                      </Col>
                    </Row>
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input
                                type="checkbox"
                                value={productObservation.inStock}
                                onChange={(e) => {
                                  updateProductObservation({
                                    variables: {
                                      data: { inStock: e.target.checked },
                                    },
                                  });
                                }}
                              />{' '}
                              Is In Stock?
                            </Label>
                            <Tooltip id="is-in-stock" text={hints.inStock} />
                          </FormGroup>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input
                                type="checkbox"
                                value={productObservation.imprint}
                                onChange={(e) => {
                                  updateProductObservation({
                                    variables: {
                                      data: { imprint: e.target.checked },
                                    },
                                  });
                                }}
                              />{' '}
                              Is Imprint?
                            </Label>
                            <Tooltip id="is-imprint" text={hints.imprint} />
                          </FormGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                  </TabPane>
                  {/* Non-Persistent Fields */}
                  <TabPane tabId="2" className={css(contentPadding)}>
                    <CustomInput
                      id="quantity-in-stock"
                      type="number"
                      label="Quantity In Stock"
                      value={productObservation.quantityInStock}
                      onChange={(e) => {
                        updateProductObservation({
                          variables: {
                            data: { quantityInStock: parseInt(e.target.value, 10) },
                          },
                        });
                      }}
                    />
                    <CustomInput
                      id="quantity-required"
                      type="number"
                      label="Quantity Required"
                      value={productObservation.quantityRequired}
                      onChange={(e) => {
                        updateProductObservation({
                          variables: {
                            data: { quantityInStock: parseInt(e.target.value, 10) },
                          },
                        });
                      }}
                    />
                    <CustomInput
                      id="quantity-allowed"
                      type="number"
                      label="Quantity Allowed"
                      hint={hints.quantityAllowed}
                      value={productObservation.quantityAllowed}
                      onChange={(e) => {
                        updateProductObservation({
                          variables: {
                            data: { quantityAllowed: parseInt(e.target.value, 10) },
                          },
                        });
                      }}
                    />
                    <CustomInput
                      id="quantity-increment"
                      type="number"
                      label="Quantity Increment"
                      hint={hints.quantityIncrement}
                      value={productObservation.quantityIncrement}
                      onChange={(e) => {
                        updateProductObservation({
                          variables: {
                            data: { quantityIncrement: parseInt(e.target.value, 10) },
                          },
                        });
                      }}
                    />
                    <FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="checkbox"
                            value={productObservation.finalSale}
                            onChange={(e) => {
                              updateProductObservation({
                                variables: {
                                  data: { finalSale: e.target.checked },
                                },
                              });
                            }}
                          />{' '}
                          Is Final Sale?
                        </Label>
                      </FormGroup>
                    </FormGroup>
                    <CustomInput
                      id="deals"
                      label="Deals"
                      hint={hints.deals}
                      value={productObservation.deals}
                      onChange={(e) => {
                        updateProductObservation({
                          variables: {
                            data: { deals: e.target.value },
                          },
                        });
                      }}
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
                  <Button type="button" color="primary" className="float-right">
                    Analyze PDP
                  </Button>
                </div>
                <MetadataModal />
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
