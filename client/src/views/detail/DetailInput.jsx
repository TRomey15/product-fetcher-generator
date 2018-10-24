/* eslint-disable no-console */
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
  red: {
    backgroundColor: 'red',
  },
  blue: {
    backgroundColor: 'blue',
    width: '200px',
    color: 'white',
  },
  violet: {
    backgroundColor: 'purple',
  },
  detailInput: {
    fontSize: '10px',
    margin: '10px',
  },
  codeWindow: {
    backgroundColor: '#333',
    borderColor: '#333',
    color: 'white',
  },
  objectRender: {
    marginTop: '10px',
  },
  devBorder: {
    // border: '2px solid black',
    // paddiing: '5px',
  },
  detailText: {
    fontSize: '10px',
  }
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
