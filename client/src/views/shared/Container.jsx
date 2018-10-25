import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
// import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

const styles = {
  main: {
    margin: '1%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  header: {
    alignSelf: 'flex-start',
    marginLeft: '5%',
    fontFamily: 'Fjalla One, sans-serif',
  },
  cardContainer: {
    width: '95%',
    height: '85%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
};

class Container extends React.PureComponent {
  render() {
    const { header, classes } = this.props;
    return (
      <div className={classes.main}>
        <h1 className={classes.header}>{header}</h1>
        <div className={classes.cardContainer}>
          {/* {this.props.children} */}
        </div>
      </div>
    );
  }
}


Container.propTypes = propTypes;
export default injectSheet(styles)(Container);
