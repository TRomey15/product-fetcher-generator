
import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  options: PropTypes.instanceOf.array,
  classes: PropTypes.object.isRequired,
};

const defaultProps = {
  content: '',
  title: '',
};

const StoresList = (props) => {
  return (
    <div>
      <span> Options: </span>
      <select onChange={ e => props.handleFill(e.target.value) }>
        {
          (Object.keys(props.options) || []).sort().map((store) => {
            const objStringifiedRegex = Object.assign({}, props.stores[store], { regex: props.stores[store].regex.toString() });
            return <option key={ props.stores[store].id } value={ JSON.stringify(objStringifiedRegex) }> { props.stores[store].name } </option>;
          })
        }
      </select>
    </div>
  );
};

DropDown.propTypes = propTypes;
DropDown.defaultProps = defaultProps;

export default StoresList;
