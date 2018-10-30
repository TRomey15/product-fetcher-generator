import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

const propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const styles = {
  Generate: {
    backgroundColor: '#4A90E2',
    color: '#FFFFFF',
    boxShadow: 'inset 0px -2px #387DCD',
    height: '30px',
    width: '80px',
    borderRadius: '5px',
  },
  Save: {
    backgroundColor: '#55CE8F',
    boxShadow: 'inset 0px -2px #63AB86',
    height: '30px',
    width: '80px',
    borderRadius: '5px',
    alignSelf: 'flex-end',
    color: '#FFFFFF',
  },
  footerContainer: {
    alignSelf: 'flex-end',
    marginRight: '3.5%',
    marginBottom: '3.5%',
  },
  Cancel: {
    backgroundColor: '#FFFFFF',
    boxShadow: 'inset 0px -2px #B1B0B0',
    height: '30px',
    width: '80px',
    borderColor: '#979797',
    borderRadius: '5px',
    color: '#000000',
  },
  Submit: {
    backgroundColor: '#4A90E2',
    color: '#FFFFFF',
    boxShadow: 'inset 0px -2px #387DCD',
    height: '30px',
    width: '80px',
    borderRadius: '5px',
  },
  Return: {
    backgroundColor: '#4A90E2',
    color: '#FFFFFF',
    boxShadow: 'inset 0px -2px #387DCD',
    height: '30px',
    width: '80px',
    borderRadius: '5px',
  },
};

const Button = ({ classes, text, onClick }) => {
  return (
    <div className={ classes.footerContainer }>
      <button className={ classes[text] } onClick={ onClick }>{ text }</button>
    </div>
  );
};

Button.propTypes = propTypes;
export default injectSheet(styles)(Button);
