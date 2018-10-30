import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
// import classNames from 'classnames';

const styles = {
  cardDiv: {
    width: '45vw',
  },
  card: {
    display: 'flex',
    width: '45%',
    height: '100vh',
    borderColor: '#979797',
    flexDirection: 'column',
    boxShadow: '2px 7px 10px #999999',
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexGrow: '1',
    color: '#2F68AA',
    marginTop: '3.5%',
    marginLeft: '3.5%',
    fontFamily: 'Francois One, sans-serif',
  },
};

const Layout = ({ buttonText, buttonOnClick, classes, header }) => {
  return (
    <div className={classes.cardContainer}>
      <div className={ classes.card}>
        <h2 className={ classes.header }>{header}</h2>
        <Button text={ buttonText } onClick={ buttonOnClick } />
      </div>
    </div>
  );
};

Layout.propTypes = {
  buttonText: PropTypes.string.isRequired,
  buttonOnClick: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};
export default injectSheet(styles)(Layout);
