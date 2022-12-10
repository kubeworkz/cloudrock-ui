import { useMemo, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { translate } from '@cloudrock/i18n';
import { showSuccess, showErrorResponse } from '@cloudrock/store/notify';
import { ActionButton } from '@cloudrock/table/ActionButton';
import { getCustomer, getUser } from '@cloudrock/workspace/selectors';

import { InvitationService } from '../InvitationService';

import { InvitationPolicyService } from './InvitationPolicyService';

export const InvitationCancelButton: FunctionComponent<{
  invitation;
  refreshList;
}> = ({ invitation, refreshList }) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const customer = useSelector(getCustomer);

  const callback = async () => {
    try {
      await InvitationService.cancel(invitation.uuid);
      dispatch(showSuccess(translate('Invitation has been canceled.')));
      refreshList();
    } catch (e) {
      dispatch(showErrorResponse(e, translate('Unable to cancel invitation.')));
    }
  };

  const isDisabled = useMemo(() => {
    if (
      !InvitationPolicyService.canManageInvitation(
        { user, customer },
        invitation,
      )
    ) {
      return true;
    }
    if (invitation.state !== 'pending') {
      return true;
    }
    return false;
  }, [user, customer, invitation]);

  const tooltip = useMemo(() => {
    if (
      !InvitationPolicyService.canManageInvitation(
        { user, customer },
        invitation,
      )
    ) {
      return translate("You don't have permission to cancel this invitation.");
    }

    if (invitation.state !== 'pending') {
      return translate('Only pending invitation can be canceled.');
    }
  }, [user, customer, invitation]);

  return (
    <ActionButton
      action={callback}
      title={translate('Cancel')}
      icon="fa fa-ban"
      disabled={isDisabled}
      tooltip={tooltip}
    />
  );
};
