import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Inspector, chromeLight } from 'react-inspector';

import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  Card,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Row,
} from 'reactstrap';

import DetailInput from './DetailInput.jsx';
import AutoCompleteModal from '../shared/AutoCompleteModal.jsx';

const styles = {
  activeBadge: {
    marginBottom: '10px',
  },
  detailContainer: {
    margin: '20px',
  },
  buttonGroup: {
    margin: '0 auto',
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
    padding: '10px',
  },
  dropText: {
    fontSize: '10px',
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
      handleUndo,
    } = this.props;

    const colorizeButtons = (sourceType) => {
      let color;
      if (sourceType === 'api') {
        color = 'info';
      } else if (sourceType === 'script') {
        color = 'warning';
      } else {
        color = 'success';
      }
      return color;
    };

    const activeField = 'primary_image';
    const selectedResponse = 0; // temporarily hardcoding...
    const tabSources = Object.keys(data[activeField].sources);
    const activeSource = data[activeField].sources[currentField.name][selectedResponse];

    const inputFields = Object.keys(activeSource)
    .filter((key) => { // exclude rendering of inputs displayed elsewhere...
      return !['selected', 'functions', 'object']
      .includes(key);
    }).map((inputField) => {
      return (
        <div key={inputField}>
          <DetailInput
            colorizeButtons={colorizeButtons}
            handleDetailFormClick={handleDetailFormClick}
            activeSource={activeSource}
            inputField={inputField}
            selectedResponse={selectedResponse}
            currentField={currentField.name}
          />
        </div>
      );
    });

    return (
      <div className={classes.detailContainer}>
        <Container>
          <Row>
            <Col xs="6" md="5">
              <Badge className={classes.activeBadge}>{data.primary_image.name}</Badge>
              <Form>
                {inputFields}
                <FormGroup row>
                  <AutoCompleteModal
                    title="Transformation"
                    suggestions={transformFunctions}
                  />
                </FormGroup>
              </Form>
            </Col>
            <Col className={classes.devBorder} xs="6" md="7">
              <p />
              <ButtonGroup size="sm" className={classes.buttonGroup}>
                <ButtonDropdown size="sm" isOpen={this.state.dropdownOpen} toggle={this.toggle} name="name">
                  <DropdownToggle caret color={colorizeButtons(currentField.name)}>
                    {currentField.name}
                  </DropdownToggle>
                  <DropdownMenu size="sm">
                    {Object.keys(tabSources).map(i =>
                      (<DropdownItem
                        className={classes.dropText}
                        size="sm"
                        onClick={e => handleDisplayFieldChange('name', e)}
                        key={i.toString()}
                        value={tabSources[i]}
                      >
                        {tabSources[i]}
                      </DropdownItem>))}
                  </DropdownMenu>
                </ButtonDropdown>
                <Button onClick={() => { handleUndo(); }}>restore</Button>
                <Button onClick={() => saveClick('submit')} color="danger">save</Button>
              </ButtonGroup>
              <Card className={classes.objectRender}>
                <Inspector
                  theme={{ ...chromeLight, ...({ TREE_NODE_PADDING: 20 }, { TREENODE_FONT_SIZE: '8px' }) }}
                  className={classes.objectRender}
                  initialExpandedPaths={['root', 'root.*']}
                  data={activeSource.object}
                />
                {/* <ObjectInspector className={classes.objectRender} initialExpandedPaths={['root', 'root.*']} data={activeSource.object} /> */}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Detail.propTypes = {
  classes: PropTypes.object.isRequired,
  currentField: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  handleDisplayFieldChange: PropTypes.func.isRequired,
  handleDetailFormClick: PropTypes.func.isRequired,
  handleUndo: PropTypes.func.isRequired,
  saveClick: PropTypes.func.isRequired,
  transformFunctions: PropTypes.array.isRequired,
};
export default injectSheet(styles)(Detail);
