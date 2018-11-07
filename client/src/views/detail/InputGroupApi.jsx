/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

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
    this.state = {
      propertyPath: this.props.defaultPropertyPath,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(field, e) {
    this.setState({ [field]: e.target.value,
    });
  }

  componentDidUpdate(prevprops) {
    if (prevprops.defaultPropertyPath !== this.props.defaultPropertyPath) {
      this.setState({ propertyPath: this.props.defaultPropertyPath });
    }
  }

  render() {
    const {
      activeSource,
      classes,
      currentField,
      data,
      // defaultPropertyPath,
      colorizeButtons,
      handleDetailFormClick,
      productDetailsKey,
      tabSources,
    } = this.props;

    // const defaultPropertyPath = this.state.propertyPath;
    // const defaultPropertyPath = data.paths[productDetailsKey][activeSource].jsonPath[0].path[0].join('.');

    return (
      <div>
        <FormGroup>
          <Label>Content: {data.targetProduct[productDetailsKey]}</Label>
          <FormGroup row>
            <Label>Property Path:</Label>
            <InputGroup placeholder="sm" bssize="sm" className={classes.DetailInput}>
              <Input bssize="sm" className={classes.detailText} onChange={e => this.handleChange('propertyPath', e)} value={this.state.propertyPath} />
              <InputGroupAddon addonType="append">
                <Button
                  size="sm"
                  onClick={() => handleDetailFormClick('propertyPath', this.state.propertyPath)}
                  color={colorizeButtons(tabSources[activeSource])}
                >Set</Button>
              </InputGroupAddon>
            </InputGroup>
            <Label> {currentField.data.propertyPath}</Label>
            {/* <Label> {defaultPropertyPath}</Label> */}
          </FormGroup>
        </FormGroup>
      </div>
    );
  }
}

InputGroupApi.propTypes = {
  currentField: PropTypes.object.isRequired,
  tabSources: PropTypes.array.isRequired,
  defaultPropertyPath: PropTypes.string.isRequired,
  activeSource: PropTypes.number.isRequired,
  colorizeButtons: PropTypes.func.isRequired,
  handleDetailFormClick: PropTypes.func.isRequired,
  productDetailsKey: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default injectSheet(styles)(InputGroupApi);
