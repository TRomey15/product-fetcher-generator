import React from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';
import beautify from 'js-beautify';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/tomorrow';

const HtmlPane = () => {
  return (
    <Row>
      <Col md={6}>
        <Form>
          <FormGroup>
            <Label for="css-selector">CSS Selector</Label>
            <Input id="css-selector" placeholder="e.g. #id_value" />
          </FormGroup>
          <FormGroup>
            <Label for="selector-content">Content</Label>
            <Input id="selector-content" disabled />
          </FormGroup>
          <FormGroup>
            <Label for="transformations">Transformations</Label>
            <Typeahead
              menuId="transformations"
              multiple
              clearButton
              emptyLabel="No transformations available"
              options={['trim', 'toLower', 'stripCurrency']}
            />
          </FormGroup>
          <FormGroup>
            <Label for="js-transformed-value">Transformed Value</Label>
            <Input id="js-transformed-value-path" value="SOME VALUE" disabled />
          </FormGroup>
        </Form>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label for="cheerio-expression">Cheerio Expression</Label>
          <AceEditor
            name="cheerio-expression"
            mode="javascript"
            theme="tomorrow"
            showGutter
            showPrintMargin={false}
            highlightActiveLine={false}
            maxLines={10}
            width="100%"
            value={beautify.js(`
            cheerio
              .find('link[rel=canonical]')
              .attr('href');
            `)
            }
            editorProps={{ $blockScrolling: true }}
          />
        </FormGroup>
      </Col>
    </Row>
  );
};

export default HtmlPane;
