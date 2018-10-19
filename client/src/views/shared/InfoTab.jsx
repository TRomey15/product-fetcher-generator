
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
    width: '30%',
  },
  infoTabContent: {
    backgroundColor: 'yellow',
    width: '30%',
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
