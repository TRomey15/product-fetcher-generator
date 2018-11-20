import React from 'react';
import PropTypes from 'prop-types';
import { trim, map, isEmpty } from 'lodash-es';
import {
  Input,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  FormFeedback,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { css } from 'emotion';
import RequiredIcon from '../RequiredIcon';
import { validate } from '../../validation/validators';

const linkContainer = {
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: '15px',
};

const BASE_URL = 'http://localhost:8015'; // TODO move to config file

export default class StoreForm extends React.Component {
  constructor(props) {
    super(props);
    this.getProductPageUrls = this.getProductPageUrls.bind(this);
  }

  getProductPageUrls(store) {
    const { ui } = this.props;
    if (!isEmpty(store.storeId)) {
      fetch(`${BASE_URL}/getAvailableFilenames/${store.storeId}/har`, { mode: 'cors' })
      .then(res => res.text())
      .then((body) => {
        let json = null;
        try {
          json = JSON.parse(body);
        } catch (err) {
          // Not a JSON, do nothing
        }
        return json;
      })
      .then((urls) => {
        if (!isEmpty(urls)) {
          ui.set({ productPageUrls: urls || [] });
          store.set({ productPageUrl: urls[0] || '' });
        } else {
          ui.set({ productPageUrls: [] });
        }
      })
      .catch((err) => {
        ui.set({
          globalErrorMessage: `Unable to load Product Page URLs. Is the server running? [${err}]` });
      });
    } else {
      ui.set({ productPageUrls: [] });
      store.set({ productPageUrl: '' });
    }
  }

  render() {
    const { store, ui } = this.props;

    return (
      <Form id="store-info-form" noValidate>
        <Row>
          <Col>
            <FormGroup>
              <Label for="store-id">
                Store ID
                <RequiredIcon />
              </Label>
              <Input
                id="store-id"
                invalid={!!ui.validationErrors.storeId}
                value={store.storeId}
                onChange={(e) => {
                  ui.validationErrors.remove('storeId');
                  const updatedStore = store.set({ storeId: e.target.value }).now();
                  this.getProductPageUrls(updatedStore);
                }}
                onBlur={(e) => {
                  validate('storeId', trim(e.target.value), 'Store ID cannot be empty.').matchWith({
                    Success: _ => _,
                    Failure: ({ value }) => ui.validationErrors.set({ storeId: value }),
                  });
                }}
              />
              <FormFeedback>{ui.validationErrors.storeId}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="product-pages-by-store">
                Product Page URLs
                <RequiredIcon />
              </Label>
              <Input
                id="product-pages-by-store"
                type="select"
                disabled={isEmpty(ui.productPageUrls)}
                invalid={!!ui.validationErrors.productPageUrl}
                value={store.productPageUrl}
                onChange={(e) => {
                  ui.validationErrors.remove('productPageUrl');
                  store.set({ productPageUrl: e.target.value }).now();
                }}
                onBlur={(e) => {
                  validate('productPageUrl', trim(e.target.value), 'Product Page URL cannot be empty.').matchWith({
                    Success: _ => _,
                    Failure: ({ value }) => ui.validationErrors.set({ productPageUrl: value }),
                  });
                }}
              >
                {map(ui.productPageUrls, (url, i) => (
                  <option key={i} value={url}>{decodeURIComponent(url)}</option>
                ))}
              </Input>
              <FormFeedback>{ui.validationErrors.productPageUrl}</FormFeedback>
            </FormGroup>
            {!isEmpty(store.productPageUrl) && (
              <div className={css(linkContainer)}>
                <a
                  className="float-right"
                  href={decodeURIComponent(store.productPageUrl).replace('.json', '')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Product Page{' '}
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                </a>
              </div>)}
          </Col>
        </Row>
      </Form>
    );
  }
}

StoreForm.propTypes = {
  store: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
};
