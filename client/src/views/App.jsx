import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import FetcherForm from './fetcherForm/FetcherForm.jsx';
import Detail from './detail/Detail.jsx';
import Modal from './shared/Modal.jsx';
// import Layout from './shared/Layout.jsx';
import mock from './mock.js';

const propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
  hide: {
    display: 'none',
  },
  show: {
    display: 'block',
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalData: {
        type: '',
        onClick: () => {},
      },
      data: mock, // all the data in Mock_Data
      currentField: { // field for detail view
        name: '',
        data: {},
      },
    };

    this.getSchemaFieldData = this.getSchemaFieldData.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.submitForm = this.submitForm.bind(this);

    // submit/onclick from fetcher generator view
    this.formOnClick = this.formOnClick.bind(this);
    this.githubOnClick = this.githubOnClick.bind(this);
    this.onSrcButtonClick = this.onSrcButtonClick.bind(this);

    // submit/onclick detail view
    this.onSaveChanges = this.onSaveChanges.bind(this);
    this.onDetailClose = this.onDetailClose.bind(this);
    // this.restoreFieldData = this.restoreFieldData.bind(this);

    // submit/onclick from modal
    this.showModal = this.showModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  // componentDidMount() {
  //   this.showModal('save'); // for testing buttons
  // }

  getSchemaFieldData(key) {
    return this.state.data[key];
  }

  saveChanges(dataUpdates) {
    this.setState({ currentField: { name: '', data: {} } });
    this.setState({ data: dataUpdates }); // should probably how data is updated
    this.showModal('save');
  }

  submitForm() {
    console.log(this.state);
    // make request
    // then...
    // const data = JSON.parse(res);
    // this.setState({ schemaFields: data });
    // if error: set state to show 'error' modal
  }

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

  githubOnClick() {
    // whatever is in data -> send to backend to send to github
    console.log(this.state);
  }

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


  render() {
    const { classes } = this.props;
    const { data, currentField, showModal, modalData } = this.state;

    const formData = data && Object.assign({}, data);
    const currentFieldData = data && Object.assign({}, currentField.data);

    return (
      <div>
        <div className={showModal ? classes.show : classes.hide}>
          <Modal
            closeModal={this.closeModal}
            functionTypeKey={modalData.type}
            onClick={modalData.onClick}
          />
        </div>
        <div className={currentFieldData ? classes.hide : classes.show}>
          <FetcherForm
            onSrcButtonClick={this.onSrcButtonClick}
            onClick={this.formOnClick}
            onSaveToGitHub={this.githubOnClick}
            data={formData}
          />
        </div>
        <div className={currentFieldData ? classes.show : classes.hide}>
          <Detail
            data={currentFieldData}
            onRestore={this.restoreSchemaFieldData}
            onSave={this.onSaveChanges}
            onClose={this.onDetailClose}
          />
        </div>
        {/* <Layout buttonText="hello" buttonOnClick={ () => { console.log('hello world'); }} header="world" /> */}
      </div>
    );
  }
}

App.propTypes = propTypes;
export default injectSheet(styles)(App);
