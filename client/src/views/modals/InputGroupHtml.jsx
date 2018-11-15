import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import { Button, FormGroup, Input, InputGroup, InputGroupAddon, Label } from 'reactstrap';

const styles = {
  detailInput: {
    fontSize: '10px',
    margin: '10px',
  },
};

class InputGroupHtml extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyPath: this.props.defaultPropertyPath,
      enclosingVariable: this.props.defaultEnclosingVariable,
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
      this.setState({
        propertyPath: this.props.defaultPropertyPath,
        enclosingVariable: this.props.defaultEnclosingVariable,
      });
    }
  }

  render() {
    const { btnColor, classes, currentField, data, handleDetailFormClick, productObservationKey } = this.props;

    return (
      <div>
        <FormGroup row>
          <Label>Content: {data.targetProduct[productObservationKey]}</Label>
        </FormGroup>
        <FormGroup row>
          <Label>Property Path:</Label>
          <InputGroup bssize="sm" className={classes.DetailInput}>
            <Input bssize="sm" className={classes.detailText} onChange={e => this.handleChange('propertyPath', e)} value={this.state.propertyPath} />
            <InputGroupAddon addonType="append">
              <Button size="sm" onClick={() => handleDetailFormClick('propertyPath', this.state.propertyPath)} color={btnColor}>
                Set
              </Button>
            </InputGroupAddon>
          </InputGroup>
          <Label className={classes.subText}> {currentField.data.propertyPath}</Label>
        </FormGroup>
        <FormGroup row>
          <Label>Enclosing Variable:</Label>
          <InputGroup placeholder="sm" bssize="sm" className={classes.DetailInput}>
            <Input
              bssize="sm"
              className={classes.detailText}
              onChange={e => this.handleChange('enclosingVariable', e)}
              value={this.state.enclosingVariable}
            />
            <InputGroupAddon addonType="append">
              <Button size="sm" onClick={() => handleDetailFormClick('enclosingVariable', this.state.enclosingVariable)} color={btnColor}>
                Set
              </Button>
            </InputGroupAddon>
          </InputGroup>
          <Label className={classes.subText}> {currentField.data.enclosingVariable}</Label>
        </FormGroup>
      </div>
    );
  }
}

InputGroupHtml.propTypes = {
  btnColor: PropTypes.string.isRequired,
  currentField: PropTypes.object.isRequired,
  defaultPropertyPath: PropTypes.string.isRequired,
  defaultEnclosingVariable: PropTypes.string.isRequired,
  handleDetailFormClick: PropTypes.func.isRequired,
  productObservationKey: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default injectSheet(styles)(InputGroupHtml);
