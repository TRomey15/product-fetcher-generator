// TODO: implement Layout
import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { Button, Col, Input, InputGroup, InputGroupAddon, Label } from 'reactstrap';

import Container from '../shared/Container.jsx';
// import Layout from '../shared/Layout.jsx';
// const header = 'Product Fetcher Generator';

const styles = {
  activeBadge: {
    position: 'relative',
    marginBottom: '10px',
    right: '15px',
  },
  detailContainer: {
    margin: '20px',
  },
  buttonGroup: {
    margin: '0 auto',
  },
  objectRender: {
    margin: '10px',
    padding: '10px',
  },
  subText: {
    fontSize: '10px',
  },
  verboseBtn: {
    fontSize: '12x',
  },
};

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
    const { classes, testPC, testBrand } = this.props;
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
  classes: PropTypes.object.isRequired,
  testPC: PropTypes.func.isRequired,
  testBrand: PropTypes.func.isRequired,
};
export default injectSheet(styles)(TestFields);
