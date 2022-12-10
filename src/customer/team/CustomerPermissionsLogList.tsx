import { connect } from 'react-redux';

import { getEventsList } from '@cloudrock/events/BaseEventsList';
import { RootState } from '@cloudrock/store/reducers';
import { getCustomer } from '@cloudrock/workspace/selectors';

export const PureCustomerPermissionsLogList = getEventsList({
  mapPropsToFilter: (props) => ({
    scope: props.customer.url,
    event_type: ['role_granted', 'role_revoked', 'role_updated'],
  }),
  mapPropsToTableId: (props) => ['customer-permissions', props.customer.uuid],
});

const enhance = connect((state: RootState) => ({
  customer: getCustomer(state),
}));

export const CustomerPermissionsLogList = enhance(
  PureCustomerPermissionsLogList,
);
