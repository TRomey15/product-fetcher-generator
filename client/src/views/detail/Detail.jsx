// TODO: implement Layout
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Button, ButtonGroup, Card, CardTitle, CardText, Row, Col, Container, Input, InputGroup,
  InputGroupAddon, ListGroup, ListGroupItem, ButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import ObjectInspector from 'react-object-inspector';

import InfoTab from '../shared/InfoTab.jsx';
import AutoCompleteModal from '../shared/AutoCompleteModal.jsx';
import ApiFieldRender from './ApiFieldRender';

const propTypes = {
  classes: PropTypes.object.isRequired,
  currentField: PropTypes.object.isRequired,
  handleDisplayFieldChange: PropTypes.func,
  handleChange: PropTypes.func,
  data: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  messageTwo: PropTypes.string.isRequired,
  handleDetailFormClick: PropTypes.func,
};

// const defaultProps = {
//   // classes: {},
//   header: '',
// };

const defaultProps = {
  handleDetailFormClick: () => {},
  handleDisplayFieldChange: () => {},
  handleChange: () => {},
};

const styles = {
  red: {
    backgroundColor: 'red',
  },
  blue: {
    backgroundColor: 'blue',
    width: '200px',
    color: 'white',
  },
  violet: {
    backgroundColor: 'purple',
  },
  detailInput: {
    // width: '400px',
    fontSize: '10px',
    margin: '10px',
  },
  codeWindow: {
    backgroundColor: '#333',
    borderColor: '#333',
    color: 'white',
  },
  objectRender: {
    marginTop: '10px',
  },
  devBorder: {
    // border: '2px solid black',
    // paddiing: '5px',
  },
};

class Detail extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { dropdownOpen: false };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  render() {
    const { classes, handleChange, handleDisplayFieldChange, handleDetailFormClick, saveClick, data, message, messageTwo, currentField } = this.props;
    const activeField = 'primary_image';
    const selectedResponse = 0 // temporarily hardcoding...
    console.log('dataz');
    console.log(data);
    const tabSources = Object.keys(data[activeField].sources);
    const activeSource = data[activeField].sources[currentField.name][selectedResponse];
    const inputFields = Object.keys(activeSource)
    .filter((x) => { // exclude rendering of inputs displayed elsewhere...
      return !['selected', 'functions', 'object']
      .includes(x);
    }).map((i) => {
      console.log(i);
      console.log(activeSource[i]);
      const holder = '';
      return (<ListGroup key={i} className={classes.detailInput}>
        <h6>{i}:</h6>
        <ListGroupItem>{JSON.stringify(activeSource[i])}</ListGroupItem>
        <InputGroup size="sm" className={classes.DetailInput}>
          <Input onChange={e => handleChange('message', e)} placeholder={activeSource[i]} />
          <InputGroupAddon addonType="append">
            <Button onClick={() => handleDetailFormClick(i, selectedResponse, message)} size="sm" color="warning">Set</Button>
          </InputGroupAddon>
        </InputGroup>
      </ListGroup>);
    });
    // const tabs = tabSources.map(e => <InfoTab className={classes.DetailInput} key={e} title={e} content={JSON.stringify(e)} />);
    return (
      <Container>
        <h5>{data.primary_image.name}</h5>
        <Row>
          <Col xs="6">
            {inputFields}
            <AutoCompleteModal
              title="Transformation"
              suggestions={['function1', 'anotherFunction']}
            />
          </Col>
          <Col className={classes.devBorder} xs="6">
            <ButtonGroup>
              <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} name="name">
                <DropdownToggle caret color="primary">
                  {currentField.name}
                </DropdownToggle>
                <DropdownMenu>
                  {Object.keys(tabSources).map(i =>
                    (<DropdownItem onClick={e => handleDisplayFieldChange('name', e)} key={i.toString()} value={tabSources[i]}>
                      {tabSources[i]}
                    </DropdownItem>))}
                </DropdownMenu>
              </ButtonDropdown>
              <Button>load</Button>
              <Button onClick={e=>saveClick('save')}color="danger">save</Button>
            </ButtonGroup>
            <Card className={classes.objectRender}>
              <ObjectInspector className={classes.objectRender} initialExpandedPaths={['root', 'root.*']} data={activeSource.object} />
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

Detail.propTypes = propTypes;
Detail.defaultProps = defaultProps;
// export default Detail;
export default injectSheet(styles)(Detail);
