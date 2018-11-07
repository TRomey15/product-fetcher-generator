

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Inspector, chromeLight } from 'react-inspector';

import {
  Badge,
  Card,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
} from 'reactstrap';

// import DetailInput from './DetailInput.jsx';
import InputGroupApi from './InputGroupApi';
import AutoCompleteModal from '../shared/AutoCompleteModal.jsx';
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
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
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
    const defaultPropertyPath = data.paths[productDetailsKey][activeSource].jsonPath[0].path[0].join('.');

    return (
      <div className={classes.detailContainer}>
        {defaultPropertyPath}
        <Container>
          <Row>
            <Col xs="6" md="5">
              <Badge className={classes.activeBadge}>{productDetailsKey}</Badge>
              <Form>
                <InputGroupApi
                  data={data}
                  colorizeButtons={colorizeButtons}
                  currentField={currentField}
                  handleDetailFormClick={handleDetailFormClick}
                  handleDisplayFieldChange={handleDisplayFieldChange}
                  activeSource={activeSource}
                  // saveClick={saveClick}
                  // handleUndo={handleUndo}
                  productDetailsKey={productDetailsKey}
                  tabSources={tabSources}
                  defaultPropertyPath={defaultPropertyPath}
                />
                <FormGroup row>
                  <AutoCompleteModal
                    title="Transformation"
                    suggestions={transformFunctions}
                    handleDetailFormClick={handleDetailFormClick}
                  />
                </FormGroup>
              </Form>
              <Inspector
                expandLevel={3}
                theme={{ ...chromeLight, ...({ TREE_NODE_PADDING: 20 }, { TREENODE_FONT_SIZE: '8px' }) }}
                className={classes.objectRender}
                initialExpandedPaths={['root', 'root.*']}
                data={currentField}
              />
            </Col>
            <Col className={classes.devBorder} xs="6" md="7">
              <SourceToggle
                evalSource={evalSource}
                productDetailsKey={productDetailsKey}
                activeSource={activeSource}
                handleDisplayFieldChange={handleDisplayFieldChange}
                colorizeButtons={colorizeButtons}
                saveClick={saveClick}
                handleUndo={handleUndo}
                data={data}
                tabSources={tabSources}
              />
              <p />
              <Card className={classes.objectRender}>
                <Inspector
                  expandLevel={3}
                  theme={{ ...chromeLight, ...({ TREE_NODE_PADDING: 20 }, { TREENODE_FONT_SIZE: '8px' }) }}
                  className={classes.objectRender}
                  initialExpandedPaths={['root', 'root.*']}
                  data={data.paths[productDetailsKey][activeSource].jsonPath[0]}
                />
              </Card>
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
  productDetailsKey: PropTypes.string.isRequired,
  handleUndo: PropTypes.func.isRequired,
  saveClick: PropTypes.func.isRequired,
  transformFunctions: PropTypes.array.isRequired,
};
export default injectSheet(styles)(Detail);
