import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash-es';

export default class DynamicList extends React.PureComponent {
  render() {
    const { children } = this.props;

    return (
      <ul>
        {map(children, (child, i) => (
          <li key={i}>{child}</li>
        ))}
      </ul>
    );
  }
}

DynamicList.propTypes = {
  children: PropTypes.node.isRequired,
};
