import React from 'react';
import {
  Input,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  FormFeedback,
} from 'reactstrap';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import RequiredIcon from '../RequiredIcon';

const GET_STORE = gql`
    {
        store  @client {
            label
            productPageUrl
        }
    }
`;

const UPDATE_STORE = gql`
    mutation updateProductObservation($data: Store!) {
        updateStore(data: $data) @client {
            label
            productPageUrl
        }
    }
`;

const StoreForm = () => (
  <Mutation mutation={UPDATE_STORE}>
    {updateStore => (
      <Query query={GET_STORE}>
        {({ data: { store } }) => (
          <Form id="store-information-form" noValidate>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="store-label">
                    Store Label
                    <RequiredIcon />
                  </Label>
                  <Input
                    id="store-label"
                    value={store.label}
                    onChange={(e) => {
                      updateStore({
                        variables: {
                          data: { label: e.target.value },
                        },
                      });
                    }}
                  />
                  <FormFeedback>Please provide a valid store label.</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="product-page-url" type="url">
                    Product Page URL
                    <RequiredIcon />
                  </Label>
                  <Input
                    id="product-page-url"
                    value={store.productPageUrl}
                    onChange={(e) => {
                      updateStore({
                        variables: {
                          data: { productPageUrl: e.target.value },
                        },
                      });
                    }}
                  />
                  <FormFeedback>Please provide a valid Product Page URL.</FormFeedback>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        )}
      </Query>
    )}
  </Mutation>
);

export default StoreForm;
