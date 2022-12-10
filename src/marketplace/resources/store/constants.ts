import { createFormAction } from 'redux-form-saga';

export const submitUsage = createFormAction(
  'cloudrock/marketplace/resources/SUBMIT_USAGE',
);
export const switchPlan = createFormAction(
  'cloudrock/marketplace/resources/SWITCH_PLAN',
);
export const terminateResource = createFormAction(
  'cloudrock/marketplace/resources/TERMINATE_RESOURCE',
);
export const changeLimits = createFormAction(
  'cloudrock/marketplace/resources/CHANGE_LIMITS',
);

export const PERIOD_CHANGED = 'cloudrock/marketplace/resources/PERIOD_CHANGED';
export const FORM_ID = 'ResourceUsageCreate';
