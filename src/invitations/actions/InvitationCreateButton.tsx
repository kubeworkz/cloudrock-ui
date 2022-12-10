import { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { openModalDialog } from '@cloudrock/modal/actions';
import { ActionButton } from '@cloudrock/table/ActionButton';
import {
  getUser,
  isOwnerOrStaff as isOwnerOrStaffSelector,
  getCustomer,
  isManager,
} from '@cloudrock/workspace/selectors';
import { Project } from '@cloudrock/workspace/types';

const InvitationCreateDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "InvitationCreateDialog" */ './InvitationCreateDialog'
    ),
  'InvitationCreateDialog',
);

export const InvitationCreateButton: FunctionComponent<{
  refreshList(): void;
  project?: Project;
}> = ({ refreshList, project }) => {
  const user = useSelector(getUser);
  const customer = useSelector(getCustomer);
  const isOwnerOrStaff = useSelector(isOwnerOrStaffSelector);
  const isProjectManager = useSelector(isManager);
  const isAllowed = isOwnerOrStaff || isProjectManager;
  const dispatch = useDispatch();
  const callback = () =>
    dispatch(
      openModalDialog(InvitationCreateDialog, {
        resolve: {
          context: {
            customer,
            user,
            refreshList,
            project,
          },
        },
      }),
    );
  return (
    <ActionButton
      action={callback}
      title={translate('Invite user')}
      icon="fa fa-plus"
      disabled={!isAllowed}
      tooltip={
        !isAllowed &&
        translate(
          'Only customer owner, project manager or staff can invite users.',
        )
      }
    />
  );
};
