
/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Button from './Button.jsx';

const propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onClick: PropTypes.func,
  title: PropTypes.string,
  toolText: PropTypes.string,
  hasToolText: PropTypes.bool,
  isMismatch: PropTypes.bool,
  classes: PropTypes.object.isRequired,
};

const defaultProps = {
  value: '',
  title: '',
  toolText: '',
  hasToolText: false,
  isMismatch: false,
  onChange: () => {},
  onKeyDown: () => {},
  onClick: () => {},
};

const styles = {
  app: {
    // marginTop: '-8px',
    // marginLeft: '-8px',
    // fontFamily: '"Montserrat", sans-serif',
    // letterSpacing: '0.7px',
  },
  inputForm: {
    display: 'flex',
    flexDirection: 'column',
    width: '200px',
    margin: '5px',
    backgroundColor: 'green',
  },
  inputFormMismatch: {
    border: '2px solid red',
    display: 'flex',
    flexDirection: 'column',
    width: '200px',
    margin: '5px',
    backgroundColor: 'green',
  },
  input: {
    width: '150px',
    border: '1px solid rgb(220,220,220)',
    borderRadius: '3px',
    backgroundColor: 'orange',
  },
  spacer: {
    backgroundColor: 'gray',
    height: '3000px',
  },
  showToolTip: {
    backrgroundColor: 'yellow',
    color: 'red',
  },
};
// tooltip enable disable / hover text passed in on props
// button enable disable

class Input extends Component {
  render() {
    const { classes, isMismatch, toolText, hasToolText, onChange, value, title, onKeyDown, onClick } = this.props;
    const showMismatch = isMismatch ? 'inputFormMismatch' : 'inputForm';
    return (
      <div className={classes[showMismatch]}>
        <span> {title} </span>
        {/* To Do Clean Up this Tooltip, use something better than alert */}
        {hasToolText ? <span className={classes.showToolTip} onClick={() => console.log(toolText)}>?</span> : <span />}
        <input className={classes.input} value={value } onChange={ onChange } onKeyDown={onKeyDown} />
        <Button text="Submit" className={classes.submit} onClick={ onClick }> run </Button>
      </div>
    );
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;
export default injectSheet(styles)(Input);
