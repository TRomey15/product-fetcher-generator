
import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

const defaultProps = {
  content: '',
  title: '',
};

const styles = {
  infoTabTitle: {
    backgroundColor: 'red',
    width: '200px',
    marginLeft: '5px',
    marginTop: '10px',
  },
  infoTabContent: {
    backgroundColor: 'yellow',
    width: '200px',
    marginLeft: '5px',
    fontSize: '10px',
  },
};

const InfoTab = ({ classes, title, content }) => {
  return (
    <div>
      <p className={classes.infoTabTitle}> {title} </p>
      <p className={classes.infoTabContent}>{content}</p>
    </div>
  );
};

InfoTab.propTypes = propTypes;
InfoTab.defaultProps = defaultProps;
export default injectSheet(styles)(InfoTab);
