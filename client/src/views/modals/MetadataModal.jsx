import React from 'react';
import {
  Alert,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ButtonGroup,
  Button,
} from 'reactstrap';
import { upperFirst } from 'lodash-es';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { css } from 'emotion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import RequestPane from './RequestPane';
import ScriptPane from './ScriptPane';
import HtmlPane from './HtmlPane';

const flexContainer = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '30px',
};

const GET_SCHEMA_FIELD = gql`
    {
        ui  @client {
            schemaField
        }
    }
`;

const CLOSE_MODAL = gql`
    mutation closeModal {
        closeModal @client
    }
`;


const GET_METADATA = gql`  
      query getMetadata($schemaField: String!) {
          metadata(schemaField: $schemaField) @client
      }
`;

const determineActivePane = (metadata = {}) => {
  if (metadata.xhr) {
    return 'XHR';
  }

  if (metadata.script) {
    return 'Script';
  }

  if (metadata.html) {
    return 'HTML';
  }

  return null;
};

const MetadataModal = () => {
  return (
    <Query query={GET_SCHEMA_FIELD}>
      {({ data: { ui } }) => (
        <Query query={GET_METADATA} variables={{ schemaField: ui.schemaField } }>
          {({ data: { metadata } }) => {
            console.log('METADATA', metadata);
            const activePane = determineActivePane(metadata);
            return (
              <Mutation mutation={CLOSE_MODAL}>
                {closeModal => (
                  <Modal
                    isOpen={!!ui.schemaField}
                    centered
                    keyboard
                    fade={false}
                    size="lg"
                    toggle={closeModal}
                  >
                    <ModalHeader toggle={closeModal}>
                      {upperFirst(ui.schemaField)}{' '}
                      <FontAwesomeIcon icon={faSignInAlt} className="text-muted" />
                    </ModalHeader>
                    <ModalBody>
                      <Alert color="warning" fade={false}>
                        The values defined on the API pane take precedence. Changes made here will have no effect.
                      </Alert>
                      <div className={css(flexContainer)}>
                        <ButtonGroup>
                          <Button>API</Button>
                          <Button active>Script</Button>
                          <Button>HTML</Button>
                        </ButtonGroup>
                      </div>
                      {activePane === 'XHR' && <RequestPane />}
                      {activePane === 'Script' && <ScriptPane />}
                      {activePane === 'HTML' && <HtmlPane />}
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="primary"
                        onClick={() => console.log('Do something')}
                      >
                        Save
                      </Button>{' '}
                      <Button
                        color="secondary"
                        onClick={closeModal}
                      >
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Modal>
                )}
              </Mutation>
            );
          }}
        </Query>
      )}
    </Query>
  );
};

export default MetadataModal;
