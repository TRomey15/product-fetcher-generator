import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input, Form, FormGroup, Label, TabPane, TabContent } from 'reactstrap';
import { map, isEmpty, trim } from 'lodash-es';
import { css } from 'emotion';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';
import { discoverPathsAndJson } from '@honeyscience/product-har-analyzer';
import Tooltip from '../Tooltip';
import RequiredIcon from '../RequiredIcon';
import CustomInputGroup from '../CustomInputGroup';
import CustomFieldList from '../CustomFieldList';
import SecondaryImageUrlList from '../SecondaryImageUrlList';
import MetadataModal from '../modals/MetadataModal';
import SchemaFormButton from './SchemaFormButton';
import hints from '../../hints';
import { validate } from '../../validation/validators';
import { removeFalsy, transformMetadata } from '../../services/utils';

const contentPadding = { padding: '15px' };
const groupTitle = { textDecoration: 'underline' };

const BASE_URL = 'http://localhost:8015'; // TODO move to config file

export default class SchemaForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.analyzeProductPage = this.analyzeProductPage.bind(this);
  }

  handleModalClick(schemaField) {
    const { ui } = this.props;

    return () => {
      ui.set({ schemaField });
    };
  }

  validate(key, value, msg) {
    const { ui } = this.props;

    validate(key, trim(value), msg).matchWith({
      Success: _ => _,
      Failure: ({ value: v }) => ui.validationErrors.set({ [key]: v }),
    });
  }

  analyzeProductPage(storeId, fileName, fileType = 'har') {
    const { productObservation, metadata, ui } = this.props;
    const prodObsObj = removeFalsy(productObservation);

    if (!isEmpty(prodObsObj)) {
      ui.set({ isAnalyzingProductPage: true });
      fetch(`${BASE_URL}/getFile/${storeId}/${fileType}/${fileName}`, { mode: 'cors' })
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then(harFile => discoverPathsAndJson(prodObsObj, JSON.parse(harFile)))
      .then(result => result.pathsResult)
      .then(meta => metadata.reset(transformMetadata(meta)))
      .catch((err) => {
        this.props.ui.set({
          globalErrorMessage: `Unable to load Product Page URLs [${err}]`, isAnalyzingProductPage: false });
      })
      .then(() => { this.props.ui.set({ isAnalyzingProductPage: false }); });
    }
  }

  render() {
    const {
      store,
      productObservation,
      metadata,
      ui, ui: { validationErrors },
    } = this.props;

    return (
      <Form id="schema-form" noValidate>
        <TabContent activeTab={ui.activeTab}>
          {/* Persistent Fields */}
          <TabPane tabId="1" className={css(contentPadding)}>
            <Row form>
              <Col md={6}>
                <CustomInputGroup
                  required
                  label="Schema Version"
                  invalid={!!validationErrors.schemaVersion}
                  errorMessage={validationErrors.schemaVersion}
                  value={productObservation.schemaVersion}
                  onChange={(e) => {
                    validationErrors.remove('schemaVersion');
                    productObservation.set({ schemaVersion: e.target.value }).now();
                  }}
                  onBlur={(e) => {
                    this.validate('schemaVersion', e.target.value);
                  }}
                />
              </Col>
              <Col md={6}>
                <CustomInputGroup
                  label="VIM Version"
                  value={productObservation.vimVersion}
                  onChange={(e) => {
                    productObservation.set({ vimVersion: e.target.value }).now();
                  }}
                />
              </Col>
            </Row>
            <CustomInputGroup
              required
              label="Variant ID"
              invalid={!!validationErrors.variantId}
              errorMessage={validationErrors.variantId}
              modalEnabled={!isEmpty(metadata.variantId)}
              onModalClick={this.handleModalClick('variantId')}
              hint={hints.variantId}
              value={productObservation.variantId}
              onChange={(e) => {
                validationErrors.remove('variantId');
                productObservation.set({ variantId: e.target.value }).now();
              }}
              onBlur={(e) => {
                this.validate('variantId', e.target.value, 'Variant ID cannot be empty.');
              }}
            />
            <CustomInputGroup
              required
              label="Parent ID"
              invalid={!!validationErrors.parentId}
              errorMessage={validationErrors.parentId}
              modalEnabled={!isEmpty(metadata.parentId)}
              onModalClick={this.handleModalClick('parentId')}
              hint={hints.parentId}
              value={productObservation.parentId}
              onChange={(e) => {
                validationErrors.remove('parentId');
                productObservation.set({ parentId: e.target.value }).now();
              }}
              onBlur={(e) => {
                this.validate('parentId', e.target.value, 'Parent ID cannot be empty.');
              }}
            />
            <CustomInputGroup
              label="Title"
              modalEnabled={!isEmpty(metadata.title)}
              onModalClick={this.handleModalClick('title')}
              value={productObservation.title}
              onChange={(e) => {
                productObservation.set({ title: e.target.value }).now();
                metadata.remove('title');
              }}
            />
            <CustomInputGroup
              label="Brand"
              modalEnabled={!isEmpty(metadata.brand)}
              onModalClick={this.handleModalClick('brand')}
              value={productObservation.brand}
              onChange={(e) => {
                productObservation.set({ brand: e.target.value }).now();
              }}
            />
            <CustomInputGroup
              type="textarea"
              label="Description"
              modalEnabled={!isEmpty(metadata.description)}
              onModalClick={this.handleModalClick('description')}
              hint={hints.description}
              value={productObservation.description}
              onChange={(e) => {
                productObservation.set({ description: e.target.value }).now();
              }}
            />
            <CustomInputGroup
              type="textarea"
              id="ext-description"
              label="Extended Description"
              modalEnabled={!isEmpty(metadata.extendedDescription)}
              onModalClick={this.handleModalClick('extendedDescription')}
              hint={hints.extendedDescription}
              value={productObservation.extendedDescription}
              onChange={(e) => {
                productObservation.set({ extendedDescription: e.target.value }).now();
              }}
            />
            <Row form>
              <Col md={4}>
                <CustomInputGroup
                  required
                  id="price-current"
                  label="Current Price"
                  invalid={!!validationErrors.priceCurrent}
                  errorMessage={validationErrors.priceCurrent}
                  modalEnabled={!isEmpty(metadata.priceCurrent)}
                  onModalClick={this.handleModalClick('priceCurrent')}
                  value={productObservation.priceCurrent}
                  onChange={(e) => {
                    validationErrors.remove('priceCurrent');
                    productObservation.set({ priceCurrent: e.target.value }).now();
                  }}
                  onBlur={(e) => {
                    this.validate('priceCurrent', e.target.value, 'Current price is not valid.');
                  }}
                />
              </Col>
              <Col md={4}>
                <CustomInputGroup
                  required
                  type="number"
                  id="price-list"
                  label="List Price"
                  min={0}
                  modalEnabled={!isEmpty(metadata.listPrice)}
                  onModalClick={this.handleModalClick('listPrice')}
                  hint={hints.listPrice}
                  value={productObservation.priceList}
                  onChange={(e) => {
                    productObservation.set({ listPrice: e.target.value }).now();
                  }}
                />
              </Col>
              <Col md={4}>
                <CustomInputGroup
                  required
                  label="Currency"
                  invalid={!!validationErrors.currency}
                  errorMessage={validationErrors.currency}
                  modalEnabled={!isEmpty(metadata.currency)}
                  onModalClick={this.handleModalClick('currency')}
                  hint={hints.currency}
                  value={productObservation.currency}
                  onChange={(e) => {
                    validationErrors.remove('currency');
                    productObservation.set({ currency: e.target.value }).now();
                  }}
                  onBlur={(e) => {
                    this.validate('currency', e.target.value);
                  }}
                />
              </Col>
            </Row>
            <CustomInputGroup
              required
              label="Canonical URL"
              modalEnabled={!isEmpty(metadata.canonicalUrl)}
              onModalClick={this.handleModalClick('canonicalUrl')}
              hint={hints.canonicalUrl}
              value={productObservation.canonicalUrl}
              onChange={(e) => {
                productObservation.set({ canonicalUrl: e.target.value }).now();
              }}
            />
            <FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    id="is-canonical"
                    type="checkbox"
                    value={productObservation.isCanonical}
                    onChange={(e) => {
                      productObservation.set({ isCanonical: e.target.value }).now();
                    }}
                  />{' '}
                  Is Canonical?
                </Label>
                <RequiredIcon />
                <Tooltip id="is-canonical" text={hints.isCanonical} />
              </FormGroup>
            </FormGroup>
            <CustomInputGroup
              label="UPC"
              modalEnabled={!isEmpty(metadata.upc)}
              onModalClick={this.handleModalClick('upc')}
              value={productObservation.upc}
              onChange={(e) => {
                productObservation.set({ upc: e.target.value }).now();
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
                  productObservation.set({ keywords: map(selected, obj => obj.label) }).now();
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
                  productObservation.set({ categories: map(selected, obj => obj.label) }).now();
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
                  productObservation.set({ productStates: map(selected, obj => obj.label) }).now();
                }}
              />
            </FormGroup>
            <CustomInputGroup
              required
              label="Primary Image URL"
              modalEnabled={!isEmpty(metadata.imageUrlPrimary)}
              onModalClick={this.handleModalClick('imageUrlPrimary')}
              value={productObservation.imageUrlPrimary}
              onChange={(e) => {
                productObservation.set({ imageUrlPrimary: e.target.value }).now();
              }}
            />
            <SecondaryImageUrlList />
            <Row form>
              <Col md={6}>
                <CustomInputGroup
                  id="rating-count"
                  type="number"
                  min={0}
                  label="Number of Ratings"
                  value={productObservation.ratingCount}
                  onChange={(e) => {
                    productObservation.set({ ratingCount: parseInt(e.target.value, 10) }).now();
                  }}
                />
              </Col>
              <Col md={6}>
                <CustomInputGroup
                  type="number"
                  min={1}
                  max={100}
                  label="Rating Value"
                  modalEnabled={!isEmpty(metadata.ratingValue)}
                  onModalClick={this.handleModalClick('ratingValue')}
                  hint={hints.ratingValue}
                  value={productObservation.ratingValue}
                  onChange={(e) => {
                    productObservation.set({ ratingValue: parseInt(e.target.value, 10) }).now();
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
                        id="in-stock"
                        type="checkbox"
                        value={productObservation.inStock}
                        onChange={(e) => {
                          productObservation.set({ inStock: e.target.checked }).now();
                        }}
                      />{' '}
                      Is In Stock?
                    </Label>
                    <Tooltip id="in-stock" text={hints.inStock} />
                  </FormGroup>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input
                        id="imprint"
                        type="checkbox"
                        value={productObservation.imprint}
                        onChange={(e) => {
                          productObservation.set({ imprint: e.target.checked }).now();
                        }}
                      />{' '}
                      Is Imprint?
                    </Label>
                    <Tooltip id="imprint" text={hints.imprint} />
                  </FormGroup>
                </FormGroup>
              </Col>
            </Row>
          </TabPane>
          {/* Non-Persistent Fields */}
          <TabPane tabId="2" className={css(contentPadding)}>
            <CustomInputGroup
              type="number"
              label="Quantity In Stock"
              min={0}
              modalEnabled={!isEmpty(metadata.quantityInStock)}
              onModalClick={this.handleModalClick('quantityInStock')}
              value={productObservation.quantityInStock}
              onChange={(e) => {
                productObservation.set({ quantityInStock: parseInt(e.target.value, 10) }).now();
              }}
            />
            <CustomInputGroup
              type="number"
              label="Quantity Required"
              min={0}
              modalEnabled={!isEmpty(metadata.quantityRequired)}
              onModalClick={this.handleModalClick('quantityRequired')}
              value={productObservation.quantityRequired}
              onChange={(e) => {
                productObservation.set({ quantityRequired: parseInt(e.target.value, 10) }).now();
              }}
            />
            <CustomInputGroup
              type="number"
              label="Quantity Allowed"
              min={0}
              modalEnabled={!isEmpty(metadata.quantityAllowed)}
              onModalClick={this.handleModalClick('quantityAllowed')}
              hint={hints.quantityAllowed}
              value={productObservation.quantityAllowed}
              onChange={(e) => {
                productObservation.set({ quantityAllowed: parseInt(e.target.value, 10) }).now();
              }}
            />
            <CustomInputGroup
              type="number"
              label="Quantity Increment"
              min={0}
              modalEnabled={!isEmpty(metadata.quantityIncrement)}
              onModalClick={this.handleModalClick('quantityIncrement')}
              hint={hints.quantityIncrement}
              value={productObservation.quantityIncrement}
              onChange={(e) => {
                productObservation.set({ quantityIncrement: parseInt(e.target.value, 10) }).now();
              }}
            />
            <FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    value={productObservation.finalSale}
                    onChange={(e) => {
                      productObservation.set({ finalSale: e.target.checked }).now();
                    }}
                  />{' '}
                  Is Final Sale?
                </Label>
              </FormGroup>
            </FormGroup>
            <CustomInputGroup
              label="Deals"
              modalEnabled={!isEmpty(metadata.deals)}
              onModalClick={this.handleModalClick('deals')}
              hint={hints.deals}
              value={productObservation.deals}
              onChange={(e) => {
                productObservation.set({ deals: e.target.value }).now();
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
        <SchemaFormButton
          disabled={ui.isAnalyzingProductPage}
          onClick={() => {
            this.analyzeProductPage(store.storeId, store.productPageUrl);
          }}
        />
        <MetadataModal
          metadata={metadata}
          ui={ui}
        />
      </Form>
    );
  }
}

SchemaForm.propTypes = {
  store: PropTypes.object.isRequired,
  productObservation: PropTypes.object.isRequired,
  metadata: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
};
