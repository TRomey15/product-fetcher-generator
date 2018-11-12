import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { Input, Form, FormGroup, Button, ButtonGroup, Tooltip, Col, Label } from 'reactstrap';

import Container from '../shared/Container';
import CustomInputFields from './CustomInputFields';
import Layout from '../shared/Layout';
import { pf, npf, cf, productPageUrl } from './productFields';

const propTypes = {
  classes: PropTypes.object.isRequired,
  // children: PropTypes.node.isRequired,
  data: PropTypes.object.isRequired,
};

const styles = {
  formContainer: {
    marginLeft: '10%',
  },
  tooltipStyle: {
    fontSize: '12px',
    marginBottom: '15%',
    marginLeft: '2%',
  },
  hide: {
    display: 'none',
    width: '80%',
  },
  show: {
    display: 'inline-block',
    marginLeft: '10%',
  },
  inline: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  addMore: {
    fontSize: '19px',
    color: '#4A90E2',
  },
};

const header = 'Product Fetcher Generator';

const requiredFields = [pf.canonical_url.name, pf.parent_id.name, pf.currency.name,
  pf.price_current.name, pf.variant_id.name, pf.price_list.name, pf.image_url_primary.name];

function saveFieldsToState(tab) {
  const updatedProdObj = Object.entries(tab).reduce((acc, [key, value]) => {
    if (Array.isArray(value.keyVal)) {
      acc[key] = value.keyVal;
    } else {
      acc[key] = '';
    }
    return acc;
  }, {});

  return updatedProdObj;
}

class FetcherForm extends React.Component {
  constructor(props) {
    super(props);

    const pfObj = saveFieldsToState(pf);
    const npfObj = saveFieldsToState(npf);
    const cfObj = saveFieldsToState(cf);

    this.state = {
      tab: pf,
      currentField: '',
      prodObj: Object.assign({}, pfObj, npfObj, cfObj, props.data.targetProduct || {}),
      validationErrors: {},
    };
    this.handleInput = this.handleInput.bind(this);
    this.showTooltip = this.showTooltip.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.addInputFields = this.addInputFields.bind(this);
    this.handleCustomInput = this.handleCustomInput.bind(this);
    this.showDetailedView = this.showDetailedView.bind(this);
  }

  handleInput(e, field) {
    e.preventDefault();
    const { prodObj } = this.state;
    let val = e.target.value;
    if (val.match(/\bYes\b|\bNo\b/)) {
      val = val === 'Yes';
    }

    this.setState({
      prodObj: Object.assign({}, prodObj, { [field]: val }),
    }, () => this.validateInput(field));
  }

  addInputFields(field) {
    const { tab } = this.state;
    const { prodObj } = this.state;
    if (Array.isArray(tab[field].keyVal)) {
      tab[field].keyVal.push({});
      this.setState({ prodObj: Object.assign({}, prodObj, { [field]: tab[field].keyVal }) });
    }
  }

  handleCustomInput(e, field) {
    const { customFields, prodObj } = this.state;
    const { target: { name, value } } = e;

    if (name === field) {
      customFields.key = value;
    } else if (name === `${field}_value`) {
      customFields.value = value;
    }

    const key = customFields.key;
    const val = customFields.value;

    if (key && val) {
      const fieldObj = prodObj[field] || {};
      fieldObj[key] = val;

      this.setState({
        prodObj: Object.assign({}, prodObj, { [field]: fieldObj }),
      });
    }
  }

  //   removeInput(name, i, field){
  //     const currTab = this.state.tab;
  //     let input = this.state.prodObj[field].slice();
  //     input.splice(i, 1);
  //     this.setState({
  //        tab[field].keyval
  //     });
  // }

  // }

  switchTab(tab) {
    this.setState({ tab, show: false });
  }

  showTooltip(e, field, isShowing) {
    e.stopPropagation();
    this.setState({
      show: !isShowing,
      currentField: field,
    });
  }

  showDetailedView(e, isShowing) {
    e.preventDefault();
    this.setState({
      displayViewButton: !isShowing,
    });
  }

  // generate click, makes request to graph ql, response given analyze fields - if populated then render button is active.


  validateInput(field) {
    const { validationErrors, tab, prodObj } = this.state;
    const fieldVal = prodObj[field];
    const dataType = tab[field].dataType;
    const fieldDataType = typeof fieldVal;
    const isNumber = Number.isNaN(+fieldVal);

    if (fieldDataType !== 'boolean') {
      const arrayMatch = (fieldVal && !fieldVal.match(/^\[.*\]$/gi)) || fieldDataType === 'array';
      switch (dataType) {
        case 'array':
          this.setState({ validationErrors: Object.assign({}, validationErrors, { [field]: arrayMatch }) });
          break;
        case 'number':
          this.setState({ validationErrors: Object.assign({}, validationErrors, { [field]: isNumber }) });
          break;
        default:
          this.setState({ validationErrors: Object.assign({}, validationErrors, { [field]: dataType !== fieldDataType }) });
          break;
      }
      if (requiredFields.indexOf(field) >= 0 && !fieldVal) {
        this.setState({ validationErrors: Object.assign({}, validationErrors, {
          [field]: !fieldVal,
        }) });
      }
    }
  }


  render() {
    const { tab, show, currentField, validationErrors, prodObj, displayViewButton } = this.state;
    const { classes } = this.props;
    return (
      <Container header={header} onClick={ () => { this.setState({ show: false }); } }>
        <p>Store Label</p>
        <Col md={3}>
          <Input onChange={(e) => { this.handleInput(e, 'store_label'); }} />
        </Col>
        <span> { productPageUrl.displayName } </span>
        <Col md={4}>
          <Input type={ productPageUrl.type } placeholder={ productPageUrl.placeholder } onChange={(e) => { this.handleInput(e, productPageUrl.name); } } />
        </Col>
        <Layout buttonText="Generate" buttonOnClick={e => this.showDetailedView(e, displayViewButton)}>
          <div className={ classes.formContainer }>
            <ButtonGroup>
              <Button color="primary" onClick={() => { this.switchTab(pf); } } active={tab === pf}>Persistent Fields</Button>
              <Button color="primary" onClick={() => { this.switchTab(npf); }} active={tab === npf}>Non-Persistent Fields</Button>
              <Button color="primary" onClick={() => { this.switchTab(cf); }} active={tab === cf}>Custom Fields</Button>
            </ButtonGroup>
            <Form>
              {
                Object.keys(tab).map((field) => {
                  if (tab[field].placeholder) {
                    return (
                      <Col md={8} key={ field }>
                        <br />
                        <FormGroup>
                          <p>
                            { tab[field].displayName }
                            <span className={ classes.tooltipStyle }>
                              <i className="fas fa-question-circle" id={field} alt="tooltipImg" onClick={e => this.showTooltip(e, field, show)} />
                            </span>
                          </p>
                          <Tooltip placement="right" isOpen={show && currentField === field} target={field}>
                            { tab[field].tooltip}
                          </Tooltip>
                          <div className={classes.inline}>
                            <Input
                              type={ tab[field].type }
                              placeholder={ tab[field].placeholder }
                              required={tab[field].required}
                              onChange={(e) => { this.handleInput(e, field, tab[field].name); } }
                              invalid={ validationErrors[tab[field].name]}
                              value={ prodObj[field] }
                            />
                            <Button
                              color="primary"
                              className={displayViewButton ? classes.show : classes.hide }
                              disabled={!prodObj[field]}
                            >
                              <i className="fas fa-pen-square" />
                            </Button>
                          </div>
                        </FormGroup>
                      </Col>
                    );
                  } else if (tab[field].values) {
                    return (
                      <div key={ field }>
                        <br />
                        <Col md={6}>
                          <p>
                            { tab[field].displayName }
                            <span className={ classes.tooltipStyle }>
                              <i className="fas fa-question-circle" id={field} alt="tooltipImg" onClick={e => this.showTooltip(e, field, show)} />
                            </span>
                          </p>
                          <Tooltip placement="right" isOpen={show && currentField === field} target={field}>
                            { tab[field].tooltip}
                          </Tooltip>
                          <FormGroup check>
                            <Label check>
                              <Input
                                type={ tab[field].type }
                                name={ tab[field].name }
                                value={ tab[field].values[0] }
                                onChange={(e) => { this.handleInput(e, field, tab[field].name); } }
                                checked={prodObj[field]}
                              />
                              { tab[field].values[0] }
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label>
                              <Input
                                type={ tab[field].type }
                                name={ tab[field].name }
                                value={ tab[field].values[1] }
                                onChange={(e) => { this.handleInput(e, field, tab[field].name); } }
                                checked={!prodObj[field]}
                              />
                              { tab[field].values[1] }
                            </Label>
                          </FormGroup>
                        </Col>
                      </div>
                    );
                  } else {
                    return (
                      <div key={ field }>
                        <br />
                        <p>
                          { tab[field].displayName }
                          <span className={ classes.tooltipStyle }>
                            <i className="fas fa-question-circle" id={field} alt="tooltipImg" onClick={e => this.showTooltip(e, field, show)} />
                          </span>
                        </p>
                        <Tooltip
                          placement="right"
                          isOpen={ show && currentField === field }
                          target={ field }
                        >
                          { tab[field].tooltip }
                        </Tooltip>
                        {
                          (tab[field].keyVal || []).map((pair, i) => {
                            const attributes = Object.entries(pair);
                            return (
                              <CustomInputFields attributes={attributes} field={field} index={i} handleCustomInput={this.handleCustomInput} />
                            );
                          })
                        }
                        <span className={classes.addMore}>
                          <i className="fas fa-plus-circle" alt="add field" onClick={() => { this.addInputFields(field); } } />
                        </span>
                      </div>
                    );
                  }
                })
              }
            </Form>
          </div>
        </Layout>
      </Container>
    );
  }
}

FetcherForm.propTypes = propTypes;
export default injectSheet(styles)(FetcherForm);
