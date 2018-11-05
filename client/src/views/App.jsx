import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import autoBind from 'react-autobind';
import { Navbar, NavbarBrand } from 'reactstrap';

import mock from './mock.js';
import Detail from './detail/Detail';
import FetcherForm from './fetcherForm/FetcherForm';
import AlertModal from './shared/AlertModal';
// import Layout from './shared/Layout.jsx';

const styles = {
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
      top: 'topline message',
      message: 'placeholder', // DummyPlaceholder for testing ui
      messageTwo: 'placeholder message 2', // Same...
      showModal: false,
      activeForm: 'primary_image', // hardcoded for now - to build out...
      modalData: {
        type: '',
        onClick: () => {},
      },
      data: workingData, // all the data in Mock_Data
      currentField: { // field for detail view
        name: '',
        data: {},
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
    this.setState({ currentField: { name: '', data: {} } });
    this.setState({ data: dataUpdates }); // should probably how data is updated
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

  // githubOnClick() {
  //   // whatever is in data -> send to backend to send to github
  // }

  // detail view
  onSaveChanges() {
    this.showModal('save');
  }

  onDetailClose() {
    this.setState({ currentField: { name: '', data: {} } });
  }

  restoreSchemaFieldData(fieldKey) {
    const originalData = this.getSchemaFieldData(fieldKey);
    this.setState({ currentField: { data: originalData } });
  }

  // modal
  showModal(modalType) {
    console.log('hitting show modal');
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
    const showModal = this.state.showModal;
    this.setState({ showModal: !showModal });
  }

  handleUndo() {
    const undoData = JSON.parse(JSON.stringify(mock.mockData));
    this.setState({ data: undoData });
  }

  handleDisplayFieldChange(field, e) {
    // console.log('handling display', e.target.value);
    console.log('handling display', e);
    const newState = { ...this.state };
    newState.currentField[field] = e.target.value;
    this.setState(() => Object.assign({}, newState));
  }

  handleChange(field, e) {
    this.setState({
      [field]: e.target.value,
    });
  }

  handleDetailFormClick(field, index, e) {
    if (e.length) {
      const newState = { ...this.state };
      newState.data[this.state.activeForm].sources[this.state.currentField.name][index][field] = e;
      this.setState(() => Object.assign({}, newState));
    }
  }

  render() {
    const { classes } = this.props;
    const { data, currentField, showModal, modalData } = this.state;
    const formData = data && Object.assign({}, data);
    const currentFieldData = data && Object.assign({}, currentField.data);

    return (
      <div>
        <Navbar className={classes.headerBrand} color="secondary">
          <NavbarBrand className={classes.headerBrand}> {/* temporarily holding topline */}
            <img src="https://cdn.joinhoney.com/images/header/honey-logo-orange.svg" alt="Honey" data-reactid="20" /> &nbsp;product fetcher generator
          </NavbarBrand>
        </Navbar>
        <div className={currentFieldData ? classes.hide : classes.show}>
          <FetcherForm
            onSrcButtonClick={this.onSrcButtonClick}
            onClick={this.formOnClick}
            onSaveToGitHub={this.githubOnClick}
            data={formData}
          />
        </div>
        {/* FIXME: Either way, classes.show will be the class? */}
        <div className={currentFieldData ? classes.show : classes.show}>
          <Detail
            currentField={currentField}
            data={this.state.data}
            handleDisplayFieldChange={this.handleDisplayFieldChange}
            handleDetailFormClick={this.handleDetailFormClick}
            handleUndo={this.handleUndo}
            onClose={this.onDetailClose}
            // onRestore={this.restoreSchemaFieldData}
            onSave={this.onSaveChanges}
            saveClick={this.showModal}
            transformFunctions={mock.dummyFunctions}
          />
        </div>
        <div className={showModal ? classes.show : classes.hide}>
          <AlertModal
            showModal={this.state.showModal}
            closeModal={this.closeModal}
            functionTypeKey={modalData.type}
            saveChanges={this.onSaveChanges}
          />
        </div>
        {/* <Layout buttonText="hello" buttonOnClick={ () => { console.log('hello world'); }} header="world" /> */}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default injectSheet(styles)(App);
