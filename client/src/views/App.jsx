import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import autoBind from 'react-autobind';
import { Button, Modal, ModalBody, Navbar, NavbarBrand } from 'reactstrap';

import mock from './mock.js';
import Detail from './detail/Detail';
import FetcherForm from './fetcherForm/FetcherForm';
import AlertModal from './shared/AlertModal';
import TestFields from './detail/TestFields';
// import Layout from './shared/Layout.jsx';

const styles = {
  detailModal: {
    width: '800px',
  },
  hide: {
    display: 'none',
  },
  show: {
    display: 'block',
  },
  headerBrand: {
    fontSize: '18px',
    color: 'white',
  },
};

// consider Lodash implementation for this deep copy...
const workingData = JSON.parse(JSON.stringify(mock));

class App extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      showModal: false,
      showDetail: false,
      activeSource: 0, // choose which source/path provided by backend is used for active form
      modalData: {
        type: '',
        onClick: () => {},
      },
      data: workingData, // all the data in Mock_Data
      currentField: {
        // field for detail view
        name: '', // hardcoding for now - provided by JS's form...
        data: {
          // modified data returned from detail view...
          propertyPath: 'foo',
          scriptRegex: 'bar',
          enclosingVariable: 'funkyVariable',
          transformation: [],
        },
      },
    };
  }

  // USED BY FORM
  getTargetProduct() {
    return this.state.data.targetProduct || {};
  }

  setCurrentField(name) {
    this.setState((prevState) => {
      const paths = prevState.data.paths;
      return {
        currentField: {
          name,
          data: paths[name],
        },
      };
    });
  }

  // USED BY DETAIL
  getCurrentField() {
    return this.state.currentField;
  }

  componentDidMount() {
    // this.showModal('save'); // for testing buttons
    // this.setCurrentField('brand'); // setting for brand upon instantiation for testing purposes
  }

  getSchemaFieldData(key) {
    return this.state.data[key];
  }

  saveChanges(dataUpdates) {
    this.setState({
      currentField: { name: '', data: {} },
      data: dataUpdates, // should probably how data is updated
    });
    this.showModal('save');
  }

  // submitForm() {
  //   // make request
  //   // then...
  //   // const data = JSON.parse(res);
  //   // this.setState({ schemaFields: data });
  //   // if error: set state to show 'error' modal
  // }

  // fetcher generator view
  onSubmit() {
    this.submitForm();
  }

  formOnClick() {
    this.showModal('submit');
  }

  onSrcButtonClick(fieldKey) {
    const name = fieldKey;
    const data = this.getSchemaFieldData(fieldKey);
    this.setState({ currentField: { name, data } });
  }

  // detail view
  onSaveChanges() {
    // fire backend save event here...
    this.showModal('save');
    this.onDetailClose('');
  }

  restoreSchemaFieldData(fieldKey) {
    const originalData = this.getSchemaFieldData(fieldKey);
    this.setState({ currentField: { data: originalData } });
  }

  // modal (Alert Type)
  showModal(modalType) {
    const actions = {
      submit: this.submitForm,
      error: this.closeModal,
      save: this.saveChanges,
    };

    const updatedModalData = {
      onClick: actions[modalType],
      type: modalType,
    };
    this.setState({ showModal: true, modalData: updatedModalData });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  toggleDetail() {
    if (this.state.showDetail) {
      this.onDetailClose();
      return;
    }
    this.setState(state => ({
      showDetail: !state.showDetail,
    }));
  }

  onDetailClose() {
    this.setState(state => ({
      activeSource: 0,
      currentField: {
        ...state.currentField,
        data: {
          propertyPath: 'foo',
          scriptRegex: 'bar',
          enclosingVariable: 'funkyVariable',
          transformation: [],
        },
      },
      showDetail: false,
    }));
  }

  handleDisplayFieldChange(e) {
    // idx toggles through multiple data sources per detail field...
    this.setState({ activeSource: e });
  }

  // handleDetailFormClick(field, index, e) {
  //   if (e.length) {
  //     const newState = { ...this.state };
  //     newState.data[this.state.activeForm].sources[this.state.currentField.name][index][field] = e;
  //     this.setState(() => Object.assign({}, newState));
  //   }
  // }

  handleDetailFormClick(field, e) {
    this.setState(state => ({
      currentField: {
        ...state.currentField,
        data: {
          ...state.currentField.data,
          [field]: e,
        },
      },
    }));
  }

  // for testing buttons only - override w. JS UI...
  testPC() {
    this.setState(state => ({
      currentField: {
        ...state.currentField,
        name: 'price_current',
      },
      showDetail: true,
    }));
  }

  testBrand() {
    this.setState(state => ({
      currentField: {
        ...state.currentField,
        name: 'brand',
      },
      showDetail: true,
    }));
  }

  handleUndo() {
    const undoData = JSON.parse(JSON.stringify(mock));
    this.setState({ data: undoData });
  }

  render() {
    const { classes } = this.props;
    const { activeSource, data, currentField, modalData } = this.state;
    const formData = data && { ...data };

    return (
      <div>
        <Navbar className={classes.headerBrand} color="secondary">
          <NavbarBrand className={classes.headerBrand}>
            <img src="https://cdn.joinhoney.com/images/header/honey-logo-orange.svg" alt="Honey" /> product fetcher generator
          </NavbarBrand>
        </Navbar>
        <FetcherForm
          onSrcButtonClick={this.onSrcButtonClick}
          onClick={this.formOnClick}
          onSaveToGitHub={this.githubOnClick}
          data={formData}
        />
        {/* buttons for testing - replace w. js ui */}
        <Button onClick={this.testPC}>Price Current</Button>
        <p />
        <Button onClick={this.testBrand}>Brand</Button>
        {/* <TestFields testPC={this.testPC} testBrand={this.testBrand} /> */}
        <Modal toggle={this.toggleDetail} size="lg" isOpen={this.state.showDetail}>
          <ModalBody>
            <Detail
              activeSource={activeSource}
              currentField={currentField}
              data={data}
              handleDisplayFieldChange={this.handleDisplayFieldChange}
              handleDetailFormClick={this.handleDetailFormClick}
              handleUndo={this.handleUndo}
              onClose={this.onDetailClose}
              // onRestore={this.restoreSchemaFieldData}
              productObservationKey={currentField.name}
              onSave={this.onSaveChanges}
              saveClick={this.showModal}
              transformFunctions={mock.dummyFunctions}
            />
          </ModalBody>
        </Modal>
        <AlertModal closeModal={this.closeModal} functionTypeKey={modalData.type} saveChanges={this.onSaveChanges} showModal={this.state.showModal} />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default injectSheet(styles)(App);
