import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';

import { isEmpty } from '@cloudrock/core/utils';
import { getEventsList } from '@cloudrock/events/BaseEventsList';
import { translate } from '@cloudrock/i18n';
import { useTitle } from '@cloudrock/navigation/title';
import { RootState } from '@cloudrock/store/reducers';
import { getCustomer } from '@cloudrock/workspace/selectors';

import { CustomerEventsFilter } from './CustomerEventsFilter';

export const PureCustomerEvents = getEventsList({
  mapPropsToFilter: (props) => {
    const filter = {
      ...props.userFilter,
      scope: props.customer.url,
    };
    if (props.userFilter && isEmpty(props.userFilter.feature)) {
      filter.feature = ['customers', 'projects', 'resources'];
    }
    return filter;
  },
  mapPropsToTableId: (props) => ['customer-events', props.customer.uuid],
});

const mapStateToProps = (state: RootState) => ({
  customer: getCustomer(state),
  userFilter: getFormValues('customerEventsFilter')(state),
});

const CustomerEvents = connect(mapStateToProps)(PureCustomerEvents);

export const CustomerEventsView = (props) => {
  useTitle(translate('Audit logs'));
  return (
    <>
      <CustomerEventsFilter />
      <CustomerEvents {...props} />
    </>
  );
};
