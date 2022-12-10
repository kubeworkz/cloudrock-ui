import { get, post } from '@cloudrock/core/api';

import { Invitation } from './types';

class InvitationServiceClass {
  createInvitation(payload) {
    return post('/user-invitations/', payload);
  }

  createGroupInvitation(payload) {
    return post('/user-group-invitations/', payload);
  }

  check(invitation_uuid) {
    return this.executeAction(invitation_uuid, 'check');
  }

  accept(invitation_uuid, replace_email) {
    return this.executeAction(invitation_uuid, 'accept', {
      replace_email: replace_email,
    });
  }

  submitRequest(uuid) {
    return post(`/user-group-invitations/${uuid}/request/`, {});
  }

  cancel(invitation_uuid) {
    return this.executeAction(invitation_uuid, 'cancel');
  }

  resend(invitation_uuid) {
    return this.executeAction(invitation_uuid, 'send');
  }

  approve(token) {
    return post(`/user-invitations/approve/`, {
      token,
    });
  }

  reject(token) {
    return post(`/user-invitations/reject/`, {
      token,
    });
  }

  details(invitation_uuid) {
    return get<Invitation>(`/user-invitations/${invitation_uuid}/details/`);
  }

  fetchUserGroupInvitationById(invitation_uuid) {
    return get<Invitation>(`/user-group-invitations/${invitation_uuid}/`);
  }

  executeAction(invitation_uuid, action, data?) {
    return post(`/user-invitations/${invitation_uuid}/${action}/`, data);
  }
}

export const InvitationService = new InvitationServiceClass();
