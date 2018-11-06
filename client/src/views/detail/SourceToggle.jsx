
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import {
  Button,
  ButtonDropdown,
  ButtonGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';

const styles = {
  dummy: {
    color: 'black',
  },
};

class SourceToggle extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);

    this.state = {
      dropdownOpen: false,
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
    const {
      activeSource,
      classes,
      colorizeButtons,
      handleDisplayFieldChange,
      handleUndo,
      saveClick,
      tabSources,
    } = this.props;

    return (
      <div>
        <ButtonGroup size="sm" className={classes.buttonGroup}>
          <ButtonDropdown size="sm" isOpen={this.state.dropdownOpen} toggle={this.toggle} name="name">
            <DropdownToggle caret color={colorizeButtons(tabSources[activeSource])}>
              {tabSources[activeSource]}
            </DropdownToggle>
            <DropdownMenu size="sm">
              {tabSources.map((i, idx) =>
                (<DropdownItem
                  className={classes.dummy}
                  size="sm"
                  onClick={() => handleDisplayFieldChange(idx)}
                  key={idx.toString()}
                  value={i}
                >
                  {i} : {idx}
                </DropdownItem>))}
            </DropdownMenu>
          </ButtonDropdown>
          <Button onClick={() => { handleUndo(); }}>restore</Button>
          <Button onClick={() => saveClick('submit')} color="danger">save</Button>
        </ButtonGroup>
      </div>
    );
  }
}

SourceToggle.propTypes = {
  activeSource: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  colorizeButtons: PropTypes.func.isRequired,
  handleDisplayFieldChange: PropTypes.func.isRequired,
  handleUndo: PropTypes.func.isRequired,
  saveClick: PropTypes.func.isRequired,
  tabSources: PropTypes.array.isRequired,
};
export default injectSheet(styles)(SourceToggle);
