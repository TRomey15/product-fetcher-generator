import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const propTypes = {
  // children: PropTypes.node.isRequired,
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
};

class Container extends React.PureComponent {
  render() {
    const { header, classes } = this.props;
    return (
      <div className={classes.main}>
        <h1 className={classes.header}>{header}</h1>
        {/* {this.props.children} */}
      </div>
    );
  }
}


Container.propTypes = propTypes;
export default injectSheet(styles)(Container);
