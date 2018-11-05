/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Inspector, chromeLight } from 'react-inspector';


import {
  FormGroup,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  Label,
} from 'reactstrap';

import DetailInput from './DetailInput';

const styles = {};

class InputGroupApi extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { dropdownOpen: false };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  render() {


    const {
      activeField,
      classes,
      data,
      colorizeButtons,
      handleDetailFormClick,
      activeSource,
      inputField,
      selectedResponse,
      currentField,
    } = this.props;

    const defaultPath = data.paths[activeField][0].jsonPath[0].path[0].join('.');

    return (
      <div>
        {/* <Inspector
          data={data}
        /> */}
        <FormGroup>
          <Label>Content: </Label>
          {inputField}
          <Label>
            {data.targetProduct.price_current}
          </Label>
          <DetailInput
            colorizeButtons={colorizeButtons}
            handleDetailFormClick={handleDetailFormClick}
            activeSource={activeSource}
            inputField={inputField}
            selectedResponse={selectedResponse}
            currentField={currentField}
            activeField={activeField}
            data={data}
          />
        <FormGroup row key={inputField}>
          <Label>Property Path: {defaultPath}</Label>
          <InputGroup placeholder="sm" bssize="sm" className={classes.DetailInput}>
            <Input bssize="sm" className={classes.detailText} onChange={e => this.handleChange('message', e)} />
            <InputGroupAddon addonType="append">
              <Button
                size="sm"
                onClick={() => handleDetailFormClick(inputField, selectedResponse, this.state.message)}
                color={colorizeButtons(currentField)}
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
  currentField: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  // handleDisplayFieldChange: PropTypes.func.isRequired,
  // handleDetailFormClick: PropTypes.func.isRequired,
  // handleUndo: PropTypes.func.isRequired,
  // saveClick: PropTypes.func.isRequired,
  // transformFunctions: PropTypes.array.isRequired,
};

export default injectSheet(styles)(InputGroupApi);
