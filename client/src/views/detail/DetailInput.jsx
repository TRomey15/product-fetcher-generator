import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import {
  Button,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
} from 'reactstrap';

const styles = {
  detailInput: {
    fontSize: '10px',
    margin: '10px',
  },
  detailText: {
    fontSize: '10px',
  },
};

class DetailInput extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);

    this.state = {
      dropdownOpen: false,
      message: this.props.activeSource[this.props.inputField],
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  handleChange(field, e) {
    this.setState({ [field]: e.target.value });
  }

  render() {
    const { colorizeButtons, currentField, selectedResponse, activeSource, inputField, classes, handleDetailFormClick } = this.props;

    return (
      <div>
        <FormGroup row key={inputField}>
          <Label> {inputField}:</Label>
          <InputGroup placeholder="sm" bssize="sm" className={classes.DetailInput}>
            <Input bssize="sm" className={classes.detailText} onChange={e => this.handleChange('message', e)} placeholder={activeSource[inputField]} />
            <InputGroupAddon addonType="append">
              <Button
                size="sm"
                onClick={() => handleDetailFormClick(inputField, selectedResponse, this.state.message)}
                color={colorizeButtons(currentField)}
              >Set</Button>
            </InputGroupAddon>
          </InputGroup>
          <FormText
            color={this.state.message !== activeSource[inputField] ? 'danger' : 'primary'}
            className={classes.detailText}
          >{activeSource[inputField]}</FormText>
        </FormGroup>
        <p />
      </div>
    );
  }
}

DetailInput.propTypes = {
  classes: PropTypes.object.isRequired,
  handleDetailFormClick: PropTypes.func.isRequired,
  activeSource: PropTypes.object.isRequired,
  selectedResponse: PropTypes.number.isRequired,
  inputField: PropTypes.string.isRequired,
  currentField: PropTypes.string.isRequired,
  colorizeButtons: PropTypes.func.isRequired,
};
export default injectSheet(styles)(DetailInput);
