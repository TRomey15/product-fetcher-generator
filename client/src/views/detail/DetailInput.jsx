import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import { Button, Input, InputGroup, InputGroupAddon, ListGroup, ListGroupItem } from 'reactstrap';

const propTypes = {
  classes: PropTypes.object.isRequired,
  handleDetailFormClick: PropTypes.func.isRequired,
  activeSource: PropTypes.object.isRequired,
  selectedResponse: PropTypes.number.isRequired,
  i: PropTypes.string.isRequired,
};

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
    this.state = { dropdownOpen: false, message: '' };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  handleChange(field, e) {
    this.setState({ [field]: e.target.value });
  }

  render() {
    const { selectedResponse, activeSource, i, classes, handleDetailFormClick } = this.props;
    return (
      <div>
        <p />
        <ListGroup key={i}>
          <h6>{i}:</h6>
          <ListGroupItem className={classes.detailText}>{activeSource[i]}</ListGroupItem>
          <InputGroup size="sm" className={classes.DetailInput}>
            <Input className={classes.detailText} onChange={e => this.handleChange('message', e)} placeholder={activeSource[i]} />
            <InputGroupAddon addonType="append">
              <Button onClick={() => handleDetailFormClick(i, selectedResponse, this.state.message)} color="primary">Set</Button>
            </InputGroupAddon>
          </InputGroup>
        </ListGroup>
        <p />
      </div>
    );
  }
}

DetailInput.propTypes = propTypes;
export default injectSheet(styles)(DetailInput);
