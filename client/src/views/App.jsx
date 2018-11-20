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
  Alert,
} from 'reactstrap';
import LoadingOverlay from 'react-loading-overlay';
import { css } from 'emotion';
import beautify from 'js-beautify';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';
import freezer from '../store/freezer';
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

const toggle = tab => () => {
  const { ui } = freezer.get();
  ui.set({ activeTab: tab });
};

class App extends React.PureComponent {
  componentDidMount() {
    freezer.on('update', () => this.forceUpdate());
    const state = freezer.get();
    const storeListener = state.store.getListener();
    storeListener.on('update', () => {
      freezer.get().metadata.reset({});
    });
  }

  render() {
    const { store, productObservation, metadata, ui } = freezer.get();

    return (
      <Container fluid className={css(containerPadding)}>
        <Alert
          color="danger"
          isOpen={!!ui.globalErrorMessage}
          toggle={() => ui.remove('globalErrorMessage')}
        >
          {ui.globalErrorMessage}
        </Alert>
        <h1 className="mb-md-3">
          Product Fetcher Generator
        </h1>
        <Row className="mb-md-3">
          <Col md={6}>
            <StoreForm store={store} ui={ui} />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Card>
              <CardHeader>
                <h5>Product Observation Schema</h5>
              </CardHeader>
              <CardBody>
                <LoadingOverlay
                  active={ui.isAnalyzingProductPage}
                  spinner
                  text="Analyzing Product Page..."
                  background="rgba(255, 255, 255, 0.8)"
                  color="#212529"
                  zIndex={1000}
                >
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        className={[ui.activeTab === '1' ? 'active' : '', css(pointer)].join(' ')}
                        onClick={toggle('1')}
                      >
                        Persistent Fields
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={[ui.activeTab === '2' ? 'active' : '', css(pointer)].join(' ')}
                        onClick={toggle('2')}
                      >
                        Non-Persistent Fields
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={[ui.activeTab === '3' ? 'active' : '', css(pointer)].join(' ')}
                        onClick={toggle('3')}
                      >
                        Custom Fields
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <SchemaForm
                    store={store}
                    productObservation={productObservation}
                    metadata={metadata}
                    ui={ui}
                  />
                </LoadingOverlay>
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <CardHeader>
                <h5>Generated Code</h5>
              </CardHeader>
              <CardBody>
                <AceEditor
                  readOnly
                  name="product-observation-code"
                  mode="javascript"
                  theme="tomorrow"
                  highlightActiveLine={false}
                  maxLines={200}
                  width="100%"
                  value={beautify.js(ui.generatedCode || '// Nothing to display')}
                  editorProps={{ $blockScrolling: true }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
