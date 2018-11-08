import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Inspector, chromeLight } from 'react-inspector';

import { Badge, Button, ButtonGroup, Card, Col, Container, Fade, Form, FormGroup, Row } from 'reactstrap';

import AutoCompleteModal from '../shared/AutoCompleteModal.jsx';
import InputGroupApi from './InputGroupApi.jsx';
import InputGroupHtml from './InputGroupHtml.jsx';
import InputGroupScript from './InputGroupScript.jsx';
import SourceToggle from './SourceToggle.jsx';

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
    margin: '10px',
    padding: '10px',
  },
  dropText: {
    fontSize: '10px',
  },
  subText: {
    fontSize: '10px',
  },
  verboseBtn: {
    fontSize: '12x',
  },
};

class Detail extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleVerbose = this.toggleVerbose.bind(this);
    this.state = {
      dropdownOpen: false,
      fadeIn: false,
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  toggleVerbose() {
    this.setState(prevState => ({
      fadeIn: !prevState.fadeIn,
    }));
  }

  render() {
    const {
      activeSource,
      classes,
      currentField,
      data,
      handleDetailFormClick,
      handleDisplayFieldChange,
      handleUndo,
      onClose,
      productDetailsKey,
      saveClick,
      transformFunctions,
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

    const evalSource = (source) => {
      let type;
      if (source.jsonPath[0].enclosingScript) {
        type = 'script';
      } else if (source.jsonPath[0].enclosingVariable) {
        type = 'html';
      } else {
        type = 'api';
      }
      return type;
    };

    const tabSources = data.paths[productDetailsKey].map(e => evalSource(e));
    const rootDataPath = data.paths[productDetailsKey][activeSource].jsonPath[0];
    const defaultPropertyPath = rootDataPath.path[0].join('.');
    const defaultEnclosingScript = rootDataPath.enclosingScript;
    const defaultEnclosingVariable = rootDataPath.enclosingVariable;
    const btnColor = colorizeButtons(tabSources[activeSource]);

    const inputGroupToRender = (inputGroupType) => {
      if (inputGroupType === 'api') {
        return (
          <InputGroupApi
            btnColor={btnColor}
            classes={classes}
            currentField={currentField}
            data={data}
            defaultPropertyPath={defaultPropertyPath}
            handleDetailFormClick={handleDetailFormClick}
            handleDisplayFieldChange={handleDisplayFieldChange}
            productDetailsKey={productDetailsKey}
            tabSources={tabSources}
          />
        );
      } else if (inputGroupType === 'script') {
        return (
          <InputGroupScript
            btnColor={btnColor}
            classes={classes}
            currentField={currentField}
            data={data}
            defaultEnclosingScript={defaultEnclosingScript}
            defaultPropertyPath={defaultPropertyPath}
            handleDetailFormClick={handleDetailFormClick}
            handleDisplayFieldChange={handleDisplayFieldChange}
            productDetailsKey={productDetailsKey}
            tabSources={tabSources}
          />
        );
      } else {
        return (
          <InputGroupHtml
            btnColor={btnColor}
            classes={classes}
            currentField={currentField}
            data={data}
            defaultEnclosingVariable={defaultEnclosingVariable}
            defaultPropertyPath={defaultPropertyPath}
            handleDetailFormClick={handleDetailFormClick}
            handleDisplayFieldChange={handleDisplayFieldChange}
            productDetailsKey={productDetailsKey}
            tabSources={tabSources}
          />
        );
      }
    };

    return (
      <div className={classes.detailContainer}>
        <Container>
          <Row>
            <Col xs="6" md="5">
              <Badge className={classes.activeBadge}>{productDetailsKey}</Badge>
              <Form>
                {inputGroupToRender(tabSources[activeSource])}
                <FormGroup row>
                  <AutoCompleteModal
                    btnColor={btnColor}
                    handleDetailFormClick={handleDetailFormClick}
                    suggestions={transformFunctions}
                    title="Transformation"
                  />
                </FormGroup>
              </Form>
              <Fade in={this.state.fadeIn}>
                <Inspector
                  className={classes.objectRender}
                  data={currentField}
                  expandLevel={3}
                  initialExpandedPaths={['root', 'root.*']}
                  theme={{ ...chromeLight, ...({ TREE_NODE_PADDING: 20 }, { TREENODE_FONT_SIZE: '8px' }) }}
                />
              </Fade>
            </Col>
            <Col className={classes.devBorder} xs="6" md="7">
              <SourceToggle
                activeSource={activeSource}
                colorizeButtons={colorizeButtons}
                data={data}
                evalSource={evalSource}
                handleDisplayFieldChange={handleDisplayFieldChange}
                handleUndo={handleUndo}
                productDetailsKey={productDetailsKey}
                saveClick={saveClick}
                tabSources={tabSources}
              />
              <p />
              <Card className={classes.objectRender}>
                <Inspector
                  className={classes.objectRender}
                  data={data.paths[productDetailsKey][activeSource].jsonPath[0]}
                  expandLevel={3}
                  initialExpandedPaths={['root', 'root.*']}
                  theme={{ ...chromeLight, ...({ TREE_NODE_PADDING: 20 }, { TREENODE_FONT_SIZE: '8px' }) }}
                />
              </Card>
              <ButtonGroup size="sm" className={classes.buttonGroup}>
                <Button size="sm" outline onClick={this.toggleVerbose}>
                  verbose
                </Button>
                <Button size="sm" onClick={onClose}>
                  close
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Detail.propTypes = {
  activeSource: PropTypes.number.isRequired,
  currentField: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  handleDisplayFieldChange: PropTypes.func.isRequired,
  handleDetailFormClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  productDetailsKey: PropTypes.string.isRequired,
  handleUndo: PropTypes.func.isRequired,
  saveClick: PropTypes.func.isRequired,
  transformFunctions: PropTypes.array.isRequired,
};
export default injectSheet(styles)(Detail);
