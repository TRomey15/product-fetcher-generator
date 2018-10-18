
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onClick: PropTypes.func,
  title: PropTypes.string,
};

const defaultProps = {
  value: '',
  onChange: () => {},
  onKeyDown: () => {},
  onClick: () => {},
  title: '',
};

const styles = {
  app: {
    // marginTop: '-8px',
    // marginLeft: '-8px',
    fontFamily: '"Montserrat", sans-serif',
    // letterSpacing: '0.7px',
  },
  inputForm: {
    display: 'flex',
    flexDirection: 'column',
    width: '430px',
    marginLeft: '8px',
  },
  input: {
    width: '100px',
    border: '1px solid rgb(220,220,220)',
    borderRadius: '3px',
  },
  button: {
    width: '50px',
    margin: '10px 0px',
    backgroundColor: 'black',
    color: 'white',
  },
  spacer: {
    backgroundColor: 'gray',
    height: '3000px',
  },
};

const Input = (props) => {
  return (

    <div style={ styles.Input }>
      <span> {props.title} </span>
      <input style={ styles.input } value={ props.value } onChange={ props.onChange } onKeyDown={props.onKeyDown} />
      <button style={ styles.button } onClick={ props.onClick }> run </button>
    </div>
  );
};

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;
export default Input;
