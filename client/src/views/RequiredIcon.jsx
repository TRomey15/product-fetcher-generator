import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';

const RequiredIcon = props => (
  <FontAwesomeIcon
    icon={faAsterisk}
    transform="up-4 shrink-8"
    className="text-danger"
    {...props}
  />
);

export default RequiredIcon;
