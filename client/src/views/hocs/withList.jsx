import React from 'react';
import { map, times } from 'lodash-es';
import { css } from 'emotion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

const flexContainer = {
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'center',
};

const flexItem = {
  flex: '1 1 auto',
};

const flexItemFixed = {
  flex: '0 1 auto',
};

const iconWrapper = {
  color: '#6c757d',
  '&:hover': {
    color: '#5a6268',
  },
  cursor: 'pointer',
  paddingLeft: '10px',
  marginTop: '15px',
};

const MAX_ROWS = 10;

const withList = (WrappedComponent) => {
  class DynamicList extends React.Component {
    constructor(props) {
      super(props);
      this.state = { count: 1, maxReached: false };
    }

    render() {
      return (
        <div {...this.props}>
          {map(times(this.state.count), (index) => {
            const shouldDeduct = this.state.count && this.state.count !== index + 1;

            return (
              <div key={index} className={css(flexContainer)}>
                <div className={css(flexItem)}>
                  <WrappedComponent />
                </div>
                <div
                  className={css(iconWrapper, flexItemFixed)}
                  onClick={() => {
                    if (shouldDeduct) {
                      this.setState(prevState => ({
                        count: prevState.count - 1,
                        maxReached: false,
                      }));
                    } else {
                      this.setState(prevState => ({
                        count: prevState.count + 1,
                        maxReached: prevState.count === MAX_ROWS,
                      }));
                    }
                  }}
                >
                  <FontAwesomeIcon icon={shouldDeduct ? faMinusCircle : faPlusCircle} size="lg" />
                </div>
              </div>);
          })}
          {this.state.maxReached && <p className="text-danger">Maximum numbers of rows ({MAX_ROWS}) reached.</p>}
        </div>
      );
    }
  }

  return DynamicList;
};

export default withList;
