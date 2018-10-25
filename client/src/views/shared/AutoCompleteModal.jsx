// TODO: potentially replace w. react-bootstrap-typeahead...

import React, { Fragment, Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Input, ListGroup, ListGroupItem } from 'reactstrap';

const propTypes = {
  classes: PropTypes.object.isRequired,
  suggestions: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

const styles = {
  activeSuggestion: {
    backgroundColor: 'red',
  },
  suggestList: {
    fontSize: '10px',
  },
};
const selectedItems = [];

// ToDo Refactor to move state to app...

class AutoCompleteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: '',
      selected: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onClearClick = this.onClearClick.bind(this);
  }

  // Event fired when the input value is changed
  onChange(e) {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value,
    });
  }

  // Event fired when the user clicks on a suggestion
  onClick(e) {
    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
    });
  }

  // Event fired when the user presses a key down
  onKeyDown(e) {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      if (filteredSuggestions[activeSuggestion]) {
        selectedItems.push(filteredSuggestions[activeSuggestion]);
        this.setState({
          activeSuggestion: 0,
          showSuggestions: false,
          userInput: '',
          selected: selectedItems,
        });
      }

    // User pressed the up arrow, decrement the index
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });

    // User pressed the down arrow, increment the index
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  }

  onClearClick(e) {
    selectedItems.splice(e, 1);
    this.setState({ selected: selectedItems });
  }

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      // classes,
      state: {
        filteredSuggestions,
        showSuggestions,
        userInput,
      },
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ListGroup className="suggestions">
            {filteredSuggestions.map((suggestion) => {
              return (
                <ListGroupItem
                  className={this.props.classes.suggestList}
                  key={suggestion}
                  onClick={onClick}
                >
                  {suggestion} :
                </ListGroupItem>
              );
            })}
          </ListGroup>
        );
      } else {
        suggestionsListComponent = (
          <span className="no-suggestions">
            <em>No suggestions...</em>
          </span>
        );
      }
    }

    return (
      <Fragment>
        <h6>

          {this.props.title} : {suggestionsListComponent}
        </h6>
        <ListGroup>
          <ListGroupItem>
            <Input
              // type="text"
              title={this.props.title}
              onChange={onChange}
              onKeyDown={onKeyDown}
              value={userInput}
            />
          </ListGroupItem>
          <ListGroupItem>
            <ButtonGroup>
              {this.state.selected.map((e, idx) => { return <Button size="sm" key={idx.toString()} onClick={() => this.onClearClick(idx)}>{e} + x</Button>; })}
            </ButtonGroup>
          </ListGroupItem>
        </ListGroup>
      </Fragment>
    );
  }
}

AutoCompleteModal.propTypes = propTypes;
// AutoCompleteModal.defaultProps = defaultProps;
export default injectSheet(styles)(AutoCompleteModal);
