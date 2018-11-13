import React from 'react';
import PropTypes from 'prop-types';
import { Popover, PopoverBody, Button } from 'reactstrap';
import ReactMarkdown from 'react-markdown/with-html';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { css } from 'emotion';

const buttonWithoutStyling = {
  padding: 0,
  border: 'none',
  font: 'inherit',
  backgroundColor: 'transparent',
  cursor: 'pointer',
};

const icon = {
  color: '#6c757d',
  '&:hover': {
    color: '#5a6268',
  },
  paddingLeft: '5px',
  marginBottom: '3px',
};

export default class Tooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  render() {
    const { id, text } = this.props;

    return text && [
      <Button
        id={`${id}-icon`}
        className={css(buttonWithoutStyling, icon)}
        key={1}
        color="link"
        size="sm"
        onClick={() => {
          this.setState(state => ({ isOpen: !state.isOpen }));
        }}
      >
        <FontAwesomeIcon icon={faInfoCircle} />
      </Button>,
      <Popover
        key={2}
        target={`${id}-icon`}
        placement="right"
        isOpen={this.state.isOpen}
        toggle={() => this.setState(state => ({ isOpen: !state.isOpen }))}
      >
        <PopoverBody>
          <ReactMarkdown source={text} escapeHtml={false} />
        </PopoverBody>
      </Popover>,
    ];
  }
}

Tooltip.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
};

Tooltip.defaultProps = {
  text: '',
};
