import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Inspector, chromeLight } from 'react-inspector';

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
      // message: this.props.activeSource[this.props.inputField],
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
    const { activeField, colorizeButtons, data, selectedResponse, activeSource, currentField, inputField, classes, handleDetailFormClick } = this.props;
    const defaultPath = data.paths[activeField][0].jsonPath[0].path[0].join('.');
    return (
      <div>
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
        <p />
      </div>
    );
  }
}

DetailInput.propTypes = {
  activeField: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  handleDetailFormClick: PropTypes.func.isRequired,
  activeSource: PropTypes.object.isRequired,
  selectedResponse: PropTypes.number.isRequired,
  inputField: PropTypes.string.isRequired,
  currentField: PropTypes.string.isRequired,
  colorizeButtons: PropTypes.func.isRequired,
};
export default injectSheet(styles)(DetailInput);
