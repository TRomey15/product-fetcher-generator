import React from 'react';
import { Button } from 'reactstrap';
import { css } from 'emotion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagic } from '@fortawesome/free-solid-svg-icons';

const SchemaFormButton = (props) => {
  return (
    <div
      id="control-buttons"
      className={css({ marginTop: '30px' })}
    >
      <Button
        type="button"
        color="primary"
        className="float-right"
        {...props}
      >
        Analyze PDP{' '}
        <FontAwesomeIcon icon={faMagic} />
      </Button>
    </div>
  );
};

export default SchemaFormButton;
