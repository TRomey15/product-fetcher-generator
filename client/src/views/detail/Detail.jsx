/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Inspector, chromeLight } from 'react-inspector';

import {
  Badge,
  Button,
  // ButtonDropdown,
  // ButtonGroup,
  Card,
  Col,
  Container,
  // DropdownItem,
  // DropdownMenu,
  // DropdownToggle,
  Form,
  FormGroup,
  Label,
  Row,
  Input,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';

import InputGroupApi from './InputGroupApi.jsx';
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
  detailText: {
    fontSize: '10px',
  },
};

class Detail extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { dropdownOpen: false };
  }

  // TODO: Don't think this is currently being used in the code?
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

    // const productDetailsKey = 'primary_image';
    // const selectedResponse = 0; // temporarily hardcoding...
    // const tabSources = Object.keys(data[productDetailsKey].sources);
    // const activeSource = data[productDetailsKey].sources[currentField.name][selectedResponse];

    // const inputFields = Object.keys(activeSource)
    // .filter((key) => { // exclude rendering of inputs displayed elsewhere...
    //   return !['selected', 'functions', 'object']
    //   .includes(key);
    // }).map((inputField) => {
    //   return (
    //     <div key={inputField}>
    //       <DetailInput
    //         colorizeButtons={colorizeButtons}
    //         handleDetailFormClick={handleDetailFormClick}
    //         activeSource={activeSource}
    //         inputField={inputField}
    //         selectedResponse={selectedResponse}
    //         currentField={currentField.name}
    //       />
    //     </div>
    //   );
    // });


    // const tabSources = ['api', 'api2', 'script', 'html'];

    const productDetailsKey = 'price_current';
    // const tabSources = Object.keys(data.paths[productDetailsKey]);
    const tabSources = data.paths[productDetailsKey].map(e => evalSource(e));
    // const teek = {jsonPath:{enclosingVariable: 'zert'}}

    // const defaultApiPath = data.paths[productDetailsKey][0].jsonPath[0].path[0].join('.');
    // const apiForm = (
    //   <div>
    //     <FormGroup>
    //       <Label>Content: {data.targetProduct.price_current}</Label>
    //       <FormGroup row>
    //         <Label>Property Path: {defaultApiPath}</Label>
    //         <InputGroup placeholder="sm" bssize="sm" className={classes.DetailInput}>
    //           <Input bssize="sm" className={classes.detailText} onChange={e => this.handleChange('message', e)} />
    //           <InputGroupAddon addonType="append">
    //             <Button
    //               size="sm"
    //               // onClick={() => handleDetailFormClick(inputField, selectedResponse, this.state.message)}
    //               color={colorizeButtons(currentField.name)}
    //             >Set</Button>
    //           </InputGroupAddon>
    //         </InputGroup>
    //       </FormGroup>
    //     </FormGroup>
    //   </div>
    // );

    console.log('this is the dataaa', data);

    // TODO: Need to figure out how to determine which path is script, html, or api data
    // TODO: Need to determine how button toggle btwn paths will change the form view
    // const defaultScriptPath = data.paths[productDetailsKey][2].jsonPath[0].path[0].join();
    // const htmlForm = (
    //   <div>
    //     <FormGroup>
    //       <Label>Content: {data.targetProduct.price_current}</Label>
    //       <FormGroup row>
    //         <Label>Property Path: {defaultScriptPath}</Label>
    //         <InputGroup placeholder="sm" bssize="sm" className={classes.DetailInput}>
    //           <Input bssize="sm" className={classes.detailText} onChange={e => this.handleChange('message', e)} />
    //           <InputGroupAddon addonType="append">
    //             <Button
    //               size="sm"
    //               // onClick={() => handleDetailFormClick(inputField, selectedResponse, this.state.message)}
    //               color={colorizeButtons(currentField.name)}
    //             >Set</Button>
    //           </InputGroupAddon>
    //         </InputGroup>
    //       </FormGroup>
    //     </FormGroup>
    //   </div>
    // );

    return (
      <div className={classes.detailContainer}>
        {/* {tabSourcez} */}
        <Inspector
          data={data.paths[productDetailsKey][0].jsonPath[0]}
        />
        {/* TODO: what is an o tag? */}
        <o>xxxx</o>
        <Container>
          <Row>
            <Col xs="6" md="5">
              <Badge className={classes.activeBadge}>{productDetailsKey}</Badge>
              <Form>
                <InputGroupApi
                  colorizeButtons={colorizeButtons}
                  data={data}
                  currentFieldName={currentField.name}
                  productDetailsKey={productDetailsKey}
                />
                <FormGroup row>
                  <AutoCompleteModal
                    title="Transformation"
                    suggestions={transformFunctions}
                  />
                </FormGroup>
              </Form>
            </Col>
            <Col className={classes.devBorder} xs="6" md="7">
              <SourceToggle
                evalSource={evalSource}
                currentField={currentField}
                handleDisplayFieldChange={handleDisplayFieldChange}
                colorizeButtons={colorizeButtons}
                saveClick={saveClick}
                handleUndo={handleUndo}
                data={data}
              />
              <p />
              <Card className={classes.objectRender}>
                <Inspector
                  theme={{ ...chromeLight, ...({ TREE_NODE_PADDING: 20 }, { TREENODE_FONT_SIZE: '8px' }) }}
                  className={classes.objectRender}
                  initialExpandedPaths={['root', 'root.*']}
                  data={data.paths[productDetailsKey]}
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
