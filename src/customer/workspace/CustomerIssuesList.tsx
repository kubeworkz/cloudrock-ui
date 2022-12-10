import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { translate } from '@cloudrock/i18n';
import { useSupport } from '@cloudrock/issues/hooks';
import { IssuesList } from '@cloudrock/issues/list/IssuesList';
import { useTitle } from '@cloudrock/navigation/title';
import { getCustomer } from '@cloudrock/workspace/selectors';

const mapStateToProps = createSelector(getCustomer, (customer) => ({
  scope: { customer },
  filter: { customer: customer && customer.url },
}));

const CustomerIssuesListComponent = connect(mapStateToProps)(IssuesList);

export const CustomerIssuesList: FunctionComponent = () => {
  useTitle(translate('Issues'));
  useSupport();
  return <CustomerIssuesListComponent hiddenColumns={['customer']} />;
};
