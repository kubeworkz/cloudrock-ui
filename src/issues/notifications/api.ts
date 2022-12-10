import { post } from '@cloudrock/core/api';

export const getNumberOfNotificationReceivers = (data) =>
  post(`/broadcast_messages/dry_run/`, data);
