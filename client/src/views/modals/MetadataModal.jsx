import React from 'react';
import PropTypes from 'prop-types';
import { upperCase, isEmpty, get, has } from 'lodash-es';
import {
  Alert,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ButtonGroup,
  Button,
} from 'reactstrap';
import { css } from 'emotion';
import RequestPane from './RequestPane';
import ScriptPane from './ScriptPane';
import HtmlPane from './HtmlPane';

const flexContainer = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '30px',
};

const modalWidth = {
  maxWidth: '50%',
};

export default class MetadataModal extends React.Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    const { ui } = this.props;
    ui.remove('schemaField');
  }

  render() {
    const { ui, metadata } = this.props;
    const showAlert = isEmpty(get(metadata, [ui.schemaField, ui.activePane], {}));

    return (
      <Modal
        className={css(modalWidth)}
        isOpen={!!ui.schemaField}
        centered
        keyboard
        fade={false}
        toggle={this.closeModal}
      >
        <ModalHeader toggle={this.closeModal}>
          {upperCase(ui.schemaField)}
        </ModalHeader>
        <ModalBody>
          {showAlert && (
            <Alert color="warning" fade={false}>
              <div className="text-center">
                {`No ${upperCase(ui.activePane)} data contains the input value.`}
              </div>
            </Alert>
          )}
          <div className={css(flexContainer)}>
            <ButtonGroup>
              <Button
                active={ui.activePane === 'xhr'}
                onClick={() => { ui.set({ activePane: 'xhr' }); }}
              >
                XHR
              </Button>
              <Button
                active={ui.activePane === 'script'}
                onClick={() => { ui.set({ activePane: 'script' }); }}
              >
                Script
              </Button>
              <Button
                active={ui.activePane === 'html'}
                onClick={() => { ui.set({ activePane: 'html' }); }}
              >
                HTML
              </Button>
            </ButtonGroup>
          </div>
          {ui.activePane === 'xhr' && !isEmpty(ui.schemaField) && (
            <RequestPane schemaField={ui.schemaField} metadata={metadata} />
          )}
          {ui.activePane === 'script' && !isEmpty(ui.schemaField) && has(metadata[ui.schemaField], 'script') && (
            <ScriptPane
              fieldMetadata={metadata[ui.schemaField].script}
            />
          )}
          {ui.activePane === 'html' && !isEmpty(ui.schemaField) && (
            <HtmlPane schemaField={ui.schemaField} metadata={metadata} />
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              // handle overrides here
              this.closeModal();
            }}
          >
            Save
          </Button>{' '}
          <Button
            color="secondary"
            onClick={this.closeModal}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

MetadataModal.propTypes = {
  metadata: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
};
