/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Inspector, chromeLight } from 'react-inspector';

import {
  FormGroup,
  Label,
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
} from 'reactstrap';

const styles = {
  detailInput: {
    fontSize: '10px',
    margin: '10px',
  },
};

class InputGroupApi extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(field, e) {
    this.setState({ [field]: e.target.value });
  }

  render() {
    const {
      classes,
      productDetailsKey,
      data,
      colorizeButtons,
      currentFieldName,
    } = this.props;

    const defaultApiPath = data.paths[productDetailsKey][0].jsonPath[0].path[0].join('.');

    return (
      <div>
        <FormGroup>
          <Label>Content: {data.targetProduct.price_current}</Label>
          <FormGroup row>
            <Label>Property Path: {defaultApiPath}</Label>
            <InputGroup placeholder="sm" bssize="sm" className={classes.DetailInput}>
              <Input bssize="sm" className={classes.detailText} onChange={e => this.handleChange('message', e)} />
              <InputGroupAddon addonType="append">
                <Button
                  size="sm"
                  // onClick={() => handleDetailFormClick(inputField, selectedResponse, this.state.message)}
                  color={colorizeButtons(currentFieldName)}
                >Set</Button>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
        </FormGroup>
      </div>
    );
  }
}

InputGroupApi.propTypes = {
  classes: PropTypes.object.isRequired,
  currentFieldName: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default injectSheet(styles)(InputGroupApi);
