import React from 'react';
import PropTypes from 'prop-types';
import { get, map, isEmpty, keys, flow, pick, values } from 'lodash-es';
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
import transformations from '../../services/transformations';

const label = {
  marginBottom: '.5rem',
};

const noOverflow = {
  overflowX: 'scroll',
};

const container = {
  border: '1px solid #ced4da',
  padding: '10px',
};

const DEFAULT_REQUEST = 0;
const DEFAULT_PATH = 0;

const applyTransformations = (value, functionNames) => {
  if (isEmpty(value) || isEmpty(functionNames)) {
    return value;
  }
  const funcs = values(pick(transformations, functionNames));

  return flow(funcs)(value);
};

export default class RequestPane extends React.Component {
  componentDidMount() {
    const { metadata, schemaField } = this.props;
    const fieldMetadata = metadata[schemaField];
    const xhr = get(fieldMetadata, 'xhr[0]', {});
    const paths = get(xhr, `paths[${DEFAULT_PATH}]`, []);
    const updatedFieldMetadata = fieldMetadata.set({ propertyPath: paths[DEFAULT_PATH] || '' });

    if (xhr.url) {
      RequestPane.setJsObject(xhr.url, updatedFieldMetadata);
    }
  }

  static setJsObject(url, fieldMetadata) {
    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        fieldMetadata.set({ jsObject: result });
      },
      () => {
        // TODO handle error
      }
    );
  }

  render() {
    const { schemaField, metadata } = this.props;
    const fieldMetadata = metadata[schemaField];
    const selectedRequest = fieldMetadata.selectedRequest || DEFAULT_REQUEST;
    const xhr = get(fieldMetadata, `xhr[${selectedRequest}]`, {});
    const paths = get(xhr, `paths[${DEFAULT_PATH}]`, []);
    const valueAtPath = get(fieldMetadata.jsObject, paths[0], '');

    return [
      <Row key={1}>
        <Col md={12}>
          <Form>
            <FormGroup>
              <Label for="request-list">Select Request</Label>
              <Input
                id="request-list"
                type="select"
                value={selectedRequest}
                onChange={(e) => {
                  const updatedFieldMetadata = fieldMetadata.set({ selectedRequest: e.target.value });
                  const request = updatedFieldMetadata.xhr[updatedFieldMetadata.selectedRequest];
                  if (!isEmpty(request)) {
                    RequestPane.setJsObject(request.url, updatedFieldMetadata);
                  }
                }}
              >
                {map(fieldMetadata.xhr, (req, index) => (
                  <option key={index} value={index}>
                    {`Request ${index + 1}`}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="js-property-path">Property Path</Label>
              <Input
                id="js-property-path"
                placeholder="e.g. obj.arr[0].key"
                value={fieldMetadata.propertyPath || ''}
                onChange={(e) => {
                  fieldMetadata.set({ propertyPath: e.target.value }).now();
                }}
                onBlur={(e) => {
                  paths.splice(0, 1, e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="js-value-path">Value at Path</Label>
              <Input
                id="js-value-path"
                disabled
                placeholder="Invalid Property Path"
                value={valueAtPath}
              />
            </FormGroup>
            <FormGroup>
              <Label for="transformations">Transformations</Label>
              <Typeahead
                menuId="transformations"
                multiple
                clearButton
                emptyLabel="No transformations available"
                options={keys(transformations) || []}
                onChange={(selectedTransformations) => {
                  if (!isEmpty(selectedTransformations)) {
                    const transformedValue = applyTransformations(valueAtPath, selectedTransformations);
                    fieldMetadata.set({ transformedValue });
                  } else {
                    fieldMetadata.remove('transformedValue');
                  }
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="js-transformed-value">Transformed Value</Label>
              <Input
                id="js-transformed-value-path"
                disabled
                value={fieldMetadata.transformedValue || ''}
              />
            </FormGroup>
          </Form>
        </Col>
      </Row>,
      <Row key={2}>
        <Col md={12} className={css(noOverflow)}>
          <div className={css(label)}>JS Object</div>
          <div className={css(container)}>
            <Inspector
              expandLevel={1}
              data={fieldMetadata.jsObject || {}}
            />
          </div>
        </Col>
      </Row>,
    ];
  }
}

RequestPane.propTypes = {
  schemaField: PropTypes.string.isRequired,
  metadata: PropTypes.object.isRequired,
};
