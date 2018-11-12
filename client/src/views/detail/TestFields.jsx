// For devlopment purposes on the detail view while main FetcherForm is under construction...
import React from 'react';
// import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { Button, Col, Input, InputGroup, InputGroupAddon, Label } from 'reactstrap';

import Container from '../shared/Container.jsx';

class TestFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // foo: 'bar',
      // message1: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(field, e) {
    this.setState({ [field]: e.target.value });
  }

  render() {
    const { testPC, testBrand } = this.props;
    return (
      <div>
        <Container>
          <Col xs="6" md="5">
            <h6>... inputs for testing detail view while Form is under construction...</h6>
            <Label>price_current:</Label>
            <InputGroup placeholder="sm" bssize="sm">
              <Input bssize="sm" onChange={e => this.handleChange('message1', e)} value={this.state.message1} />
              <InputGroupAddon addonType="append">
                <Button size="sm" onClick={testPC} color="secondary">
                  ?
                </Button>
              </InputGroupAddon>
            </InputGroup>
            <Label>brand:</Label>
            <InputGroup placeholder="sm" bssize="sm">
              <Input bssize="sm" onChange={e => this.handleChange('message2', e)} value={this.state.message2} />
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
  testPC: PropTypes.func.isRequired,
  testBrand: PropTypes.func.isRequired,
};
// export default injectSheet(styles)(TestFields);
export default TestFields;
