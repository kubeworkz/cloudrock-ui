import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { openModalDialog } from '@cloudrock/modal/actions';
import store from '@cloudrock/store/store';

import { CustomerActionsProps } from './types';
import { checkPermissions } from './utils';

const InvitationCreateDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "InvitationCreateDialog" */ '@cloudrock/invitations/actions/InvitationCreateDialog'
    ),
  'InvitationCreateDialog',
);

export const getInviteAction = (props: CustomerActionsProps) => {
  if (!checkPermissions(props)) {
    return undefined;
  }
  return {
    title: translate('Invite team member'),
    onClick() {
      store.dispatch(
        openModalDialog(InvitationCreateDialog, {
          resolve: { context: props },
        }),
      );
    },
  };
};
