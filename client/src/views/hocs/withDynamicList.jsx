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
};

const pushDown = {
  marginTop: '15px',
};

const pushUp = {
  marginBottom: '15px',
};

const withDynamicList = maxRows => (WrappedComponent) => {
  class DynamicList extends React.Component {
    constructor(props) {
      super(props);
      this.state = { count: 1, maxReached: false };
    }

    render() {
      return (
        <div>
          {map(times(this.state.count), (index) => {
            const shouldDeduct = this.state.count && this.state.count !== index + 1;
            const isFirst = index === 0;

            return (
              <div key={index} className={css(flexContainer)}>
                <div className={css(flexItem)}>
                  <WrappedComponent isFirst={isFirst} />
                </div>
                <div
                  className={css([iconWrapper, isFirst ? pushDown : pushUp, flexItemFixed])}
                  onClick={() => {
                    if (shouldDeduct) {
                      this.setState(prevState => ({
                        count: prevState.count - 1,
                        maxReached: false,
                      }));
                    } else if (!shouldDeduct && this.state.count < maxRows) {
                      this.setState(prevState => ({
                        count: prevState.count + 1,
                      }));
                    } else {
                      this.setState({ maxReached: true });
                    }
                  }}
                >
                  <FontAwesomeIcon
                    icon={shouldDeduct ? faMinusCircle : faPlusCircle}
                    size="lg"
                  />
                </div>
              </div>);
          })}
          {this.state.maxReached && <p className="text-danger">Maximum number of rows ({maxRows}) reached.</p>}
        </div>
      );
    }
  }

  return DynamicList;
};

export default withDynamicList;
