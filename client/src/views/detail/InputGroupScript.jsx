import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

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

class InputGroupScript extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyPath: this.props.defaultPropertyPath,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(field, e) {
    this.setState({ [field]: e.target.value });
  }

  componentDidUpdate(prevProps) {
    this.updatePropertyPath(prevProps);
  }

  updatePropertyPath(prevProps) {
    if (prevProps.defaultPropertyPath !== this.props.defaultPropertyPath) {
      this.setState({ propertyPath: this.props.defaultPropertyPath });
    }
  }

  render() {
    const {
      // activeSource,
      btnColor,
      classes,
      currentField,
      data,
      defaultEnclosingScript,
      handleDetailFormClick,
      productDetailsKey,
    } = this.props;

    return (
      <div>
        <FormGroup>
          <FormGroup row>
            <Label>Content: {data.targetProduct[productDetailsKey]}</Label>
            <Label>Script: {defaultEnclosingScript}</Label>
          </FormGroup>
          <FormGroup row>
            <Label>Property Path:</Label>
            <InputGroup placeholder="sm" bssize="sm" className={classes.DetailInput}>
              <Input bssize="sm" className={classes.detailText} onChange={e => this.handleChange('propertyPath', e)} value={this.state.propertyPath} />
              <InputGroupAddon addonType="append">
                <Button
                  size="sm"
                  onClick={() => handleDetailFormClick('propertyPath', this.state.propertyPath)}
                  color={btnColor}
                >Set</Button>
              </InputGroupAddon>
            </InputGroup>
            <Label> {currentField.data.propertyPath}</Label>
          </FormGroup>
        </FormGroup>
      </div>
    );
  }
}

InputGroupScript.propTypes = {
  btnColor: PropTypes.string.isRequired,
  currentField: PropTypes.object.isRequired,
  defaultPropertyPath: PropTypes.string.isRequired,
  defaultEnclosingScript: PropTypes.string.isRequired,
  handleDetailFormClick: PropTypes.func.isRequired,
  productDetailsKey: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default injectSheet(styles)(InputGroupScript);
