// TODO: potentially replace w. react-bootstrap-typeahead...
import React, { Fragment, Component } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { Badge, Button, Input, InputGroup, InputGroupAddon, Label } from 'reactstrap';

const ENTER_KEY = 13;
const UP_ARROW = 38;
const DOWN_ARROW = 40;
const COLORS = { 1: 'primary', 2: 'secondary', 3: 'success', 4: 'danger', 5: 'warning', 6: 'info', 7: 'dark' };

const selectedItems = [];

const styles = {
  activeSuggestion: {
    backgroundColor: 'red',
  },
  suggestList: {
    fontSize: '10px',
  },
  methodBadge: {
    margin: '10px 2px 0',
  },
};

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
    const filteredSuggestions = suggestions.filter(suggestion => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1);

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

  onKeyDown(e) {
    const { activeSuggestion, filteredSuggestions } = this.state;
    if (e.keyCode === ENTER_KEY) {
      if (filteredSuggestions[activeSuggestion]) {
        selectedItems.push(filteredSuggestions[activeSuggestion]);
        this.setState({
          activeSuggestion: 0,
          showSuggestions: false,
          userInput: '',
          selected: selectedItems,
        });
      }
    } else if (e.keyCode === UP_ARROW) {
      if (activeSuggestion === 0) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion - 1 });
    } else if (e.keyCode === DOWN_ARROW) {
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
      // onClick,
      onKeyDown,
      // classes,
      state: { filteredSuggestions, showSuggestions, userInput },
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <span className="suggestions">
            {filteredSuggestions.map((suggestion) => {
              return (
                <span className={this.props.classes.suggestList} key={suggestion} onClick={() => {}}>
                  {`${suggestion} `}
                </span>
              );
            })}
          </span>
        );
      } else {
        suggestionsListComponent = <span className={this.props.classes.suggestList}>No suggestions...</span>;
      }
    }

    return (
      <Fragment>
        <Label>
          {this.props.title} : {suggestionsListComponent}
        </Label>
        <InputGroup>
          <Input bsSize="sm" onChange={onChange} onKeyDown={onKeyDown} placeholder="type to insert methods..." title={this.props.title} value={userInput} />
          <InputGroupAddon addonType="append">
            <Button color={this.props.btnColor} onClick={() => this.props.handleDetailFormClick('transformation', this.state.selected)} size="sm">
              Set
            </Button>
          </InputGroupAddon>
        </InputGroup>
        {this.state.selected.map((e, idx) => {
          return (
            <Badge
              className={this.props.classes.methodBadge}
              color={COLORS[(idx + 1) % 7]}
              key={idx.toString()}
              onClick={() => this.onClearClick(idx)}
              pill
              size="xs"
            >
              {e}
            </Badge>
          );
        })}
      </Fragment>
    );
  }
}

AutoCompleteModal.propTypes = {
  btnColor: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  suggestions: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  handleDetailFormClick: PropTypes.func.isRequired,
};

export default injectSheet(styles)(AutoCompleteModal);
