import withCustomization from './hocs/withDynamicList';
import CustomFieldInputs from './AdditionalProductInputs';

const MAX_ROWS = 20;

export default withCustomization(MAX_ROWS)(CustomFieldInputs);
