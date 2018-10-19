
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onClick: PropTypes.func,
  title: PropTypes.string,
  toolText: PropTypes.string,
  hasToolText: PropTypes.bool,
  classes: PropTypes.object.isRequired,
};

const defaultProps = {
  value: '',
  title: '',
  toolText: '',
  hasToolText: false,
  onChange: () => {},
  onKeyDown: () => {},
  onClick: () => {},
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
    backgroundColor: 'green',
  },
  isMismatch: {
    border: '2px solid red',
  },
  input: {
    width: '100px',
    border: '1px solid rgb(220,220,220)',
    borderRadius: '3px',
    backgroundColor: 'orange',
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
  showToolTip: {
    backrgroundColor: 'yellow',
    color: 'red',
  },
};
// tooltip enable disable / hover text passed in on props
// button enable disable

class Input extends PureComponent {
  render() {
    const { classes, toolText, hasToolText, onChange, value, title, onKeyDown, onClick } = this.props;
    return (
      <div className={classes.inputForm}>
        <span> {title} </span>
        {/* To Do Clean Up this Tooltip, use something better than alert */}
        {hasToolText ? <span className={classes.showToolTip} onClick={() => alert(toolText)}>?</span> : <span />}
        <input className={classes.input} value={value } onChange={ onChange } onKeyDown={onKeyDown} />
        <button className={ classes.button } onClick={ onClick }> run </button>
      </div>
    );
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;
export default injectSheet(styles)(Input);
