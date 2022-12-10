import { post } from '@cloudrock/core/api';

export const addFeedback = (data) =>
  post('/support-feedbacks/', data).then((response) => response.data);
