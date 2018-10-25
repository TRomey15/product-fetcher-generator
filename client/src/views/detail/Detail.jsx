import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Button, ButtonGroup, Card, Row, Col, Container,
  ButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import ObjectInspector from 'react-object-inspector';
import DetailInput from './DetailInput.jsx';
import AutoCompleteModal from '../shared/AutoCompleteModal.jsx';

const propTypes = {
  classes: PropTypes.object.isRequired,
  currentField: PropTypes.object.isRequired,
  handleDisplayFieldChange: PropTypes.func,
  data: PropTypes.object.isRequired,
  handleDetailFormClick: PropTypes.func,
  saveClick: PropTypes.func,
  transformFunctions: PropTypes.array.isRequired,
};

const defaultProps = {
  saveClick: () => {},
  handleDetailFormClick: () => {},
  handleDisplayFieldChange: () => {},
};

const styles = {
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
    const {
      classes,
      currentField,
      data,
      handleDisplayFieldChange,
      handleDetailFormClick,
      saveClick,
      transformFunctions,
    } = this.props;

    const activeField = 'primary_image';
    const selectedResponse = 0; // temporarily hardcoding...
    const tabSources = Object.keys(data[activeField].sources);
    const activeSource = data[activeField].sources[currentField.name][selectedResponse];
    const inputFields = Object.keys(activeSource)
    .filter((x) => { // exclude rendering of inputs displayed elsewhere...
      return !['selected', 'functions', 'object']
      .includes(x);
    }).map((i) => {
      return (
        <div key={i}>
          <DetailInput
            handleDetailFormClick={handleDetailFormClick}
            activeSource={activeSource}
            i={i}
            selectedResponse={selectedResponse}
          />
        </div>
      );
    });
    return (
      <Container>
        <Row>
          <Col xs="6">
            <h5>{data.primary_image.name}</h5>
            {inputFields}
            <AutoCompleteModal
              title="Transformation"
              suggestions={transformFunctions}
            />
          </Col>
          <Col className={classes.devBorder} xs="6">
            <p />
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
              <Button>restore</Button>
              <Button onClick={() => saveClick('save')} color="danger">save</Button>
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
