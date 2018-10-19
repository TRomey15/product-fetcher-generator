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
  header: PropTypes.string.isRequired,
};

// const defaultProps = {
//   // classes: {},
//   header: '',
// };

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
    const { classes, header } = this.props;
    return (

      <div className={classes.blue}>
        {/* <Container
          header={header}
        > */}
        <h3>Here will Live a Detail View</h3>
        <p>{header}</p>
        <InfoTab title="infoDemoTitle" content="some content for InfoTab / www.gibberish.org" />
        <InfoTab title="some other Info" content="some additional content" />
        <Input hasToolText title="Script Regex:">input</Input>
        <Input title="Property Path: ">input</Input>
        <div><AutoCompleteModal
          title="Transformation"
          suggestions={[
            'cleanText',
            'priceClean',
            'priceUpdate',
            'queryState',
            'wonderfulThing',
          ]}
        /></div>
        {/* </Container> */}
      </div>
    );
  }
}

Detail.propTypes = propTypes;
// Detail.defaultProps = defaultProps;
// export default Detail;
export default injectSheet(styles)(Detail);
