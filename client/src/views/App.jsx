
import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import FetcherForm from './fetcherForm/FetcherForm.jsx';
import Detail from './detail/Detail.jsx';
import Modal from './shared/Modal.jsx';
import AutoCompleteModal from './shared/AutoCompleteModal.jsx';

/* Mock_Data
  {
    schema_field_name: {
    value: '',
    code: '',
    sources: {
      api: [{ url, path, object }],
      script: [],
      html: []
    },
    functions: [], // transformation function names/identifiers?
    },
  }
*/

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
        onClick: '',
      },
      data: '', // all the data in Mock_Data
      schemaField: '', // field for detail view
    };

    this.saveChanges = this.saveChanges.bind(this);
    this.submitForm = this.submitForm.bind(this);

    // submit/onclick from fetcher generator view
    this.formOnClick = this.formOnClick.bind(this);
    this.githubOnClick = this.githubOnClick.bind(this);

    // submit/onclick detail view
    this.onSaveChanges = this.onSaveChanges.bind(this);
    this.onDetailClose = this.onDetailClose.bind(this);

    // submit/onclick from modal
    this.showModal = this.showModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  saveChanges(dataUpdates) {
    this.setState({ data: dataUpdates });
    this.submitForm();
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

  githubOnClick() {
    // whatever is in data -> send to backend to send to github
    console.log(this.state);
  }

  // detail view
  onSaveChanges() {
    this.showModal('save');
  }

  onDetailClose() {
    this.setState({ currentFieldData: '' });
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
    const { data, schemaField, showModal, modalData } = this.state;

    const currentFieldData = data ? data[schemaField] : undefined;

    return (
      <div>
        <div>      <AutoCompleteModal
          suggestions={[
            'Michael',
            'Monica',
            'Vincent',
            'Thiemo',
            'Janise',
            'Mehrnaz',
            'Tina',
            'Gina',
            'Michelle',
          ]}
        /></div>
        <div className={showModal ? classes.show : classes.hide}>
          <Modal
            closeModal={this.closeModal}
            functionTypeKey={modalData.type}
            onClick={modalData.onClick}
          />
        </div>
        <div className={currentFieldData ? classes.hide : classes.show}>
          <FetcherForm
            onClick={this.formOnClick}
            onSaveToGitHub={this.githubOnClick}
            data={data}
          />
        </div>
        <div className={currentFieldData ? classes.show : classes.hide}>
          <Detail
            data={currentFieldData}
            onSave={this.saveChanges}
            onClose={this.onDetailClose}
          />
        </div>
      </div>
    );
  }
}

App.propTypes = propTypes;
export default injectSheet(styles)(App);
