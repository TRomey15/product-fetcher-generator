import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import { Button, Container, Col, FormGroup, InputGroup, Input, InputGroupAddon, Label } from 'reactstrap';

const styles = {
  detailInput: {
    fontSize: '10px',
    margin: '10px',
  },
};

class TestFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyPath: this.props.defaultPropertyPath,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(field, e) {
    this.setState({ [field]: e.target.value });
  }

  componentDidUpdate(prevProps) {
    this.updatePropertyPath(prevProps);
  }

  updatePropertyPath(prevProps) {
    if (prevProps.defaultPropertyPath !== this.props.defaultPropertyPath) {
      this.setState({ propertyPath: this.props.defaultPropertyPath });
    }
  }

  render() {
    const { classes, testBrand, testPC } = this.props;

    return (
      <div>
        <Container>
          <Col xs="6" md="5">
            {/* <Layout /> */}
            <Label>price_current:</Label>
            <InputGroup placeholder="sm" bssize="sm" className={classes.DetailInput}>
              <Input bssize="sm" className={classes.detailText} onChange={e => this.handleChange('message1', e)} value={this.state.message1} />
              <InputGroupAddon addonType="append">
                <Button size="sm" onClick={testPC} color="secondary">
                  ?
                </Button>
              </InputGroupAddon>
            </InputGroup>
            <Label>brand:</Label>
            <InputGroup placeholder="sm" bssize="sm" className={classes.DetailInput}>
              <Input bssize="sm" className={classes.detailText} onChange={e => this.handleChange('message2', e)} value={this.state.message2} />
              <InputGroupAddon addonType="append">
                <Button size="sm" onClick={testBrand} color="secondary">
                  ?
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </Container>
      </div>
    );
  }
}

TestFields.propTypes = {
  btnColor: PropTypes.string.isRequired,
  currentField: PropTypes.object.isRequired,
  defaultPropertyPath: PropTypes.string.isRequired,
  handleDetailFormClick: PropTypes.func.isRequired,
  productObservationKey: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default injectSheet(styles)(TestFields);
