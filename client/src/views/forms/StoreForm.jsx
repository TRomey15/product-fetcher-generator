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
            id
            productPageUrl
        }
    }
`;

const UPDATE_STORE = gql`
    mutation updateProductObservation($data: Store!) {
        updateStore(data: $data) @client {
            id
            productPageUrl
        }
    }
`;

const StoreForm = () => (
  <Mutation mutation={UPDATE_STORE}>
    {updateStore => (
      <Query query={GET_STORE}>
        {({ data: { store } }) => (
          <Form id="store-info-form" noValidate>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="store-id">
                    Store ID
                    <RequiredIcon />
                  </Label>
                  <Input
                    id="store-id"
                    value={store.storeId}
                    onChange={(e) => {
                      updateStore({
                        variables: {
                          data: { storeId: e.target.value },
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
