// TODO: implement Layout
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Input from '../shared/Input.jsx';
import InfoTab from '../shared/InfoTab.jsx';
import AutoCompleteModal from '../shared/AutoCompleteModal.jsx';
// import Container from '../shared/Container.jsx';

const propTypes = {
  classes: PropTypes.object.isRequired,
  currentField: PropTypes.string.isRequired,
  handleDisplayFieldChange: PropTypes.function,
  data: PropTypes.object.isRequired,
};

// const defaultProps = {
//   // classes: {},
//   header: '',
// };

const defaultProps = {
  handleDisplayFieldChange: () => {},
};

// const header = 'Product Fetcher Detail';

const styles = {
  red: {
    backgroundColor: 'red',
  },
  blue: {
    backgroundColor: 'blue',
  },
  violet: {
    backgroundColor: 'purple',
  },
};

class Detail extends Component {
  render() {
    const { classes, handleDisplayFieldChange, data, currentField } = this.props;
    const viewTitle = Object.keys(data)[0];
    const tabsForRender = Object.keys(data[viewTitle].sources.api[0]);
    const currentTab = currentField.name;
    const sources = data[viewTitle].sources;
    const tabs = tabsForRender.map(e => <InfoTab title={e} content={JSON.stringify(sources[currentTab][0][e])} />);
    return (
      <div>
        {/* <Container
          header={currentField.name}
        > */}
        <h3 className={classes.blue}>{viewTitle}</h3>
        <p>{currentField.name}</p>
        <select onChange={e => handleDisplayFieldChange(e.target.value)}>
          {Object.keys(sources).map(e => <option key={e.toString()} value={e}>{e}</option>)}
        </select>
        {tabs}
        <Input isMismatch hasToolText title="Script Regex:">input</Input>
        <Input title="Property Path: ">input</Input>
        <AutoCompleteModal
          title="Transformation"
          suggestions={sources[currentTab][0].functions}
        />
        {/* </Container> */}
      </div>
    );
  }
}

Detail.propTypes = propTypes;
Detail.defaultProps = defaultProps;
// export default Detail;
export default injectSheet(styles)(Detail);
