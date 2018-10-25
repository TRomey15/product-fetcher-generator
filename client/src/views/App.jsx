/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Navbar, NavbarBrand } from 'reactstrap';

import FetcherForm from './fetcherForm/FetcherForm.jsx';
import Detail from './detail/Detail.jsx';
import Modal from './shared/Modal.jsx';
// import Layout from './shared/Layout.jsx';

const testObject = { // For Demoing rendering of R hand side of detail View
  '@context': 'http:schema.org',
  '@type': 'Product',
  name: 'Solid Pique Polo',
  description: 'Joe Fresh - Solid Pique Polo is now 33-38% off. Free Shipping on orders over $100.',
  brand: 'Joe Fresh',
  image: [
    'www.hautelookcdn.com/products/MC8K190003/large/8047587.jpg',
  ],
  offers: [
    {
      '@type': 'Offer',
      priceCurrency: 'USD',
      availability: 'http:schema.org/InStock',
      price: 9.96,
    },
    {
      '@type': 'Offer',
      priceCurrency: 'USD',
      availability: 'http:schema.org./inStock',
      price: 10.7,
    },
  ],
};
// placeholder for functions returned by backend...
const dummyFunctions = ['cleanText', 'priceClean', 'makeDelicious']; // dummy helpers for transform
// /* Mock_Data
const mockData = { // simulating Data provided by Backend...
  primary_image: {
    activeKey: 'api',
    value: '', // were this 'brand' it would be zara...
    code: 'stringified function',
    name: 'primary_image',
    sources: {
      api: [{
        selected: true,
        url: 'https://images.lululemon.com/is/image/lululemon/LW1BE.jpg',
        path: 'data.product-attribute.product-carousel["0"].image-info["4"]', // input
        object: testObject,
        functions: dummyFunctions,
      },
      {
        selected: false,
        url: 'a totally different url',
        path: 'a totally different path', // input
        object: { funnyObject: 'output to editor' },
        functions: dummyFunctions,
      },
      ],
      script: [{
        scriptRegex: 'regex',
        selected: true,
        path: 'data.product-attribute.product-carousel["0"].image-info["4"]', // input
        object: { funnyObject: 'output to editor' },
        functions: dummyFunctions,
      }],
      html: [{
        selector: 'selector',
        selected: true,
        path: 'data.product-attribute.product-carousel["0"].image-info["4"]', // input
        object: { funnyObject: 'output to editor' },
        functions: dummyFunctions,
      }],
    },
  },
};

const workingData = { ...mockData };

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
  headerBrand: {
    fontFamily: 'Fjalla One, sans-serif',
    fontSize: '25px',
    // marginTop: '4%',
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);
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
        name: 'api',
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

    // handle DisplayField (api/script/html) changes
    this.handleChange = this.handleChange.bind(this);
    this.handleDisplayFieldChange = this.handleDisplayFieldChange.bind(this);
    this.handleDetailFormClick = this.handleDetailFormClick.bind(this);
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

  handleDisplayFieldChange(field, e) {
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
    const { data, currentField, showModal, modalData, message, messageTwo } = this.state;
    const formData = data && Object.assign({}, data);
    const currentFieldData = data && Object.assign({}, currentField.data);

    return (
      <div>
        <Navbar>
          <NavbarBrand className={classes.headerBrand}> {/* temporarily holding topline */}
          Product Fetcher Generator
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
        <div className={currentFieldData ? classes.show : classes.show}>
          <Detail
            data={this.state.data}
            handleDisplayFieldChange={this.handleDisplayFieldChange}
            handleChange={this.handleChange}
            onRestore={this.restoreSchemaFieldData}
            onSave={this.onSaveChanges}
            onClose={this.onDetailClose}
            handleDetailFormClick={this.handleDetailFormClick}
            currentField={currentField}
            message={message}
            messageTwo={messageTwo}
            testObject={testObject}
            saveClick={this.showModal}
            transformFunctions={dummyFunctions}
          />
        </div>
        <div className={showModal ? classes.show : classes.hide}>
          <Modal
            closeModal={this.closeModal}
            functionTypeKey={modalData.type}
            onClick={modalData.onClick}
          />
        </div>
        {/* <Layout buttonText="hello" buttonOnClick={ () => { console.log('hello world'); }} header="world" /> */}
      </div>
    );
  }
}

App.propTypes = propTypes;
export default injectSheet(styles)(App);
