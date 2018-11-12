import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import Button from './Button.jsx';
// import classNames from 'classnames';

const styles = {
  cardDiv: {
    width: '100%',
  },
  card: {
    display: 'flex',
    width: '45%',
    height: '85%',
    borderColor: '#979797',
    flexDirection: 'column',
    boxShadow: '2px 7px 10px #999999',
    overflow: 'auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    // flexGrow: '1',
    color: '#2F68AA',
    marginTop: '3.5%',
    marginLeft: '3.5%',
    fontFamily: 'Francois One, sans-serif',
  },
};

class Layout extends React.PureComponent {
  render() {
    const { classes, header, children, buttonText, buttonOnClick } = this.props;
    return (
      <div className={classes.cardDiv}>
        <div className={ classes.card}>
          <h2 className={ classes.header }>{header}</h2>
          { children }
          <Button text={ buttonText } onClick={ buttonOnClick } />
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonOnClick: PropTypes.func.isRequired,
  header: PropTypes.string,
  classes: PropTypes.object.isRequired,
};
Layout.defaultProps = {
  header: '',
};
export default injectSheet(styles)(Layout);
