import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFormValues } from 'redux-form';

import { withTranslation } from '@cloudrock/i18n';
import { PUBLIC_OFFERINGS_FILTER_FORM_ID } from '@cloudrock/marketplace/offerings/store/constants';
import { RootState } from '@cloudrock/store/reducers';
import { connectTable } from '@cloudrock/table';
import { getCustomer } from '@cloudrock/workspace/selectors';

import { TableComponent, TableOptions } from './OfferingsList';

const mapPropsToFilter = (props) => {
  const filter: Record<string, string | boolean> = {
    billable: false,
  };
  if (props.customer) {
    filter.customer_uuid = props.customer.uuid;
  }
  if (props.filter) {
    if (props.filter.state) {
      filter.state = props.filter.state.map((option) => option.value);
    }
  }
  return filter;
};

const enhance = compose(
  connect((state: RootState) => ({
    customer: getCustomer(state),
    actionsDisabled: true,
    showOfferingCreateButton: false,
    filter: getFormValues(PUBLIC_OFFERINGS_FILTER_FORM_ID)(state),
  })),
  connectTable({
    ...TableOptions,
    table: 'marketplace-my-offerings',
    mapPropsToFilter,
  }),
  withTranslation,
);

export const MyOfferingsList = enhance(TableComponent);
