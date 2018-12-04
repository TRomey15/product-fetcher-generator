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

export default class ModalPane extends React.Component {
  componentDidMount() {
    const { fieldMetadata } = this.props;
    const metadata = get(fieldMetadata, `results[${fieldMetadata.selectedRequest || DEFAULT_REQUEST}]`, {});
    fieldMetadata.set({ propertyPath: get(metadata, `paths[${DEFAULT_PATH}]`, '') });
  }

  render() {
    const { paneType, fieldMetadata } = this.props;
    const metadata = get(fieldMetadata, `results[${fieldMetadata.selectedRequest || DEFAULT_REQUEST}]`, {});
    const path = get(metadata, `paths[${DEFAULT_PATH}]`, '');
    const valueAtPath = get(metadata.fullJson, path, '');

    return [
      <Row key={1}>
        <Col md={12}>
          <Form>
            <FormGroup>
              <Label for="request-list">Selected Request</Label>
              <Input
                id="request-list"
                type="select"
                value={metadata.selectedRequest || DEFAULT_REQUEST}
                onChange={(e) => {
                  fieldMetadata.set({ selectedRequest: e.target.value });
                }}
              >
                {map(fieldMetadata.results, (res, index) => (
                  <option key={index} value={index}>
                    {res.url}
                  </option>
                ))}
              </Input>
            </FormGroup>
            {paneType === 'script' && (
              <FormGroup>
                <Label for="js-enclosing-script">
                  Enclosing Script
                </Label>
                <Input
                  id="js-enclosing-script"
                  value={metadata.enclosingScript || ''}
                  onChange={(e) => {
                    metadata.set({ enclosingScript: e.target.value }).now();
                  }}
                />
              </FormGroup>
            )}
            {paneType === 'html' && (
              <FormGroup>
                <Label for="js-enclosing-variable">
                  Enclosing Variable
                </Label>
                <Input
                  id="js-enclosing-variable"
                  value={metadata.enclosingVariable || ''}
                  onChange={(e) => {
                    metadata.set({ enclosingVariable: e.target.value }).now();
                  }}
                />
              </FormGroup>
            )}
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
                  metadata.paths.splice(0, 1, e.target.value);
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
                placeholder="Apply transformations (optional)"
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
                value={fieldMetadata.transformedValue || 'N/A'}
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
              data={metadata.fullJson || {}}
            />
          </div>
        </Col>
      </Row>,
    ];
  }
}

ModalPane.propTypes = {
  paneType: PropTypes.oneOf(['xhr', 'script', 'html']).isRequired,
  fieldMetadata: PropTypes.object.isRequired,
};
