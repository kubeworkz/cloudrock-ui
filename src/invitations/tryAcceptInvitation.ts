import store from '@cloudrock/store/store';

import { translate } from '../i18n';
import { showError } from '../store/notify';
import { UsersService } from '../user/UsersService';

import { clearInvitationToken, getInvitationToken } from './InvitationStorage';
import { acceptInvitation, confirmInvitation } from './utils';

/*
  Display invitation confirm dialog on registration.

  Triggered only if user has registered, which is the case if:
  - $stateChangeSuccess called;
  - user is logged in;
  - invitation token is set in invitation service;
  - user has filled all mandatory fields;
*/
export function tryAcceptInvitation() {
  UsersService.getCurrentUser().then((user) => {
    const token = getInvitationToken();
    if (token && !UsersService.mandatoryFieldsMissing(user)) {
      confirmInvitation(token)
        .then((replaceEmail) => {
          acceptInvitation(token, replaceEmail);
        })
        .catch(() => {
          clearInvitationToken();
          store.dispatch(
            showError(translate('Invitation could not be accepted')),
          );
        });
    }
  });
}
