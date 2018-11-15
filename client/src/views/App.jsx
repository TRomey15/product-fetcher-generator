import React from 'react';
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';
import { css } from 'emotion';
import StoreForm from './forms/StoreForm';
import SchemaForm from './forms/SchemaForm';

const containerPadding = {
  padding: '30px',
};

const pointer = {
  '&:hover': {
    cursor: 'pointer',
  },
};

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    return (
      <Container fluid className={css(containerPadding)}>
        <h1 className="mb-md-3">
          Product Fetcher Generator
        </h1>
        <Row className="mb-md-3">
          <Col md={6}>
            <StoreForm storeLabel="walmart" productPageUrl="" />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Card>
              <CardHeader>
                <h5>Product Observation Schema</h5>
              </CardHeader>
              <CardBody>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={[this.state.activeTab === '1' ? 'active' : '', css(pointer)].join(' ')}
                      onClick={() => { this.toggle('1'); }}
                    >
                      Persistent Fields
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={[this.state.activeTab === '2' ? 'active' : '', css(pointer)].join(' ')}
                      onClick={() => { this.toggle('2'); }}
                    >
                      Non-Persistent Fields
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={[this.state.activeTab === '3' ? 'active' : '', css(pointer)].join(' ')}
                      onClick={() => { this.toggle('3'); }}
                    >
                      Custom Fields
                    </NavLink>
                  </NavItem>
                </Nav>
                <SchemaForm activeTab={this.state.activeTab} />
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <CardHeader>
                <h5>Generated Code</h5>
              </CardHeader>
              <CardBody>
                TODO
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
