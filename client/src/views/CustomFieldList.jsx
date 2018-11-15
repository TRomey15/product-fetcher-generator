import withCustomization from './hocs/withDynamicList';
import CustomFieldInputs from './CustomFieldInputs';

const MAX_ROWS = 7;

export default withCustomization(MAX_ROWS)(CustomFieldInputs);
