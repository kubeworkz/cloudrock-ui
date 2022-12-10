import { createFormAction } from 'redux-form-saga';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { openIssueCreateDialog } from '@cloudrock/issues/create/actions';
import { ISSUE_IDS } from '@cloudrock/issues/types/constants';
import { openModalDialog } from '@cloudrock/modal/actions';

const UserDetailsDialog = lazyComponent(
  () =>
    import(/* webpackChunkName: "UserDetailsDialog" */ './UserDetailsDialog'),
  'UserDetailsDialog',
);
const UserRemovalMessageDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "UserRemovalMessageDialog" */ './UserRemovalMessageDialog'
    ),
  'UserRemovalMessageDialog',
);

export const showUserDetails = (user) =>
  openModalDialog(UserDetailsDialog, { resolve: { user }, size: 'lg' });

export const showUserRemoval = () => {
  const resolve = {
    issue: {
      type: ISSUE_IDS.CHANGE_REQUEST,
      summary: 'Account removal',
    },
    options: {
      title: translate('Account removal'),
      hideTitle: true,
      descriptionPlaceholder: translate(
        'Why would you want to go away? Help us become better please!',
      ),
      descriptionLabel: translate('Reason'),
      submitTitle: translate('Request removal'),
    },
  };
  return openIssueCreateDialog(resolve);
};

export const showUserRemovalMessage = (resolve) => {
  return openModalDialog(UserRemovalMessageDialog, { resolve });
};

export const updateUser = createFormAction('cloudrock/user/UPDATE');
export const activateUser = createFormAction('cloudrock/user/ACTIVATE');
export const deactivateUser = createFormAction('cloudrock/user/DEACTIVATE');
