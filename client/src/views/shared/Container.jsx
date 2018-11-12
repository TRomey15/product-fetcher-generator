import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
// import classNames from 'classnames';

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
    const { header, classes, onClick } = this.props;
    return (
      <div className={ classes.main } onClick={ onClick }>
        <h1 className={ classes.header }>{ header }</h1>
        { this.props.children }
      </div>
    );
  }
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
Container.defaultProps = {
  onClick: () => {},
  header: '',
};

export default injectSheet(styles)(Container);
