import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import FetcherForm from './fetcherForm/FetcherForm.jsx';
// import Detail from './detail/Detail.jsx';
import Modal from './shared/Modal.jsx';

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
      modal: {
        showModal: false,
        functionType: '',
        onClick: '',
      },
      data: '', // all the data in Mock_Data
      // currentFieldName: '', // field for detail view
    };

    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    // this.submitForm = this.submitForm.bind(this);
  }

  // TODO: implement during backend integration
  // submitForm() {
  //   // make request
  //
  //   // then...
  //   // const data = JSON.parse(res);
  //   // this.setState({ schemaFields: data });
  //
  //   // if error: showModal('error');
  // }

  showModal(funcKey) {
    const actions = { submit: this.submitForm, error: this.closeModal };
    const updatedModalState = {
      onClick: actions[funcKey],
      functionType: funcKey,
    };
    this.setState({ modal: updatedModalState });
  }

  closeModal() {
    const showModal = this.state.modal.showModal;
    this.setState({ modal: { showModal: !showModal } });
  }

  render() {
    const { classes } = this.props;
    const { showModal, data } = this.state;
    // const currentField = data ? data[currentFieldName] : {};
    return (
      <div>
        <Modal
          className={showModal ? classes.show : classes.hide}
          closeModal={this.closeModal}
          functionType={this.functionType}
        />
        <FetcherForm
          className={classes.show}
          showModal={this.showModal}
          data={data}
        />
        {/* <Detail
          className={currentField ? classes.show : classes.hide}
          currentField={currentField}
        /> */}
      </div>
    );
  }
}

App.propTypes = propTypes;
export default injectSheet(styles)(App);
