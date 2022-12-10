import { createFormAction } from 'redux-form-saga';

export const createOffering = createFormAction(
  'cloudrock/marketplace/offering/CREATE_OFFERING',
);
export const updateOffering = createFormAction(
  'cloudrock/marketplace/offering/UPDATE_OFFERING',
);
export const REMOVE_OFFERING_COMPONENT =
  'cloudrock/marketplace/offering/REMOVE_OFFERING_COMPONENT';
export const REMOVE_OFFERING_QUOTAS =
  'cloudrock/marketplace/offering/REMOVE_OFFERING_QUOTAS';
export const SET_STEP = 'cloudrock/marketplace/offering/SET_STATE';
export const UPDATE_OFFERING_STATE =
  'cloudrock/marketplace/offering/UPDATE_OFFERING_STATE';
export const CATEGORY_CHANGED = 'cloudrock/marketplace/offering/CATEGORY_CHANGED';
export const ADD_OFFERING_IMAGE =
  'cloudrock/marketplace/offering/ADD_OFFERING_IMAGE';
export const REMOVE_OFFERING_IMAGE =
  'cloudrock/marketplace/offering/REMOVE_OFFERING_IMAGE';
export const IS_ADDING_OFFERING_IMAGE =
  'cloudrock/marketplace/offering/IS_ADDING_OFFERING_IMAGE';
export const IS_UPDATING_OFFERING =
  'cloudrock/marketplace/offering/IS_UPDATING_OFFERING';
export const ADD_OFFERING_LOCATION =
  'cloudrock/marketplace/offering/ADD_OFFERING_LOCATION';

export const LOAD_DATA_START = 'cloudrock/marketplace/offering/LOAD_DATA_START';
export const LOAD_DATA_SUCCESS =
  'cloudrock/marketplace/offering/LOAD_DATA_SUCCESS';
export const LOAD_DATA_ERROR = 'cloudrock/marketplace/offering/LOAD_DATA_ERROR';

export const LOAD_OFFERING_START =
  'cloudrock/marketplace/offering/LOAD_OFFERING_START';

export const DRAFT = 'Draft';

export const ACTIVE = 'Active';

export const PAUSED = 'Paused';

export const ARCHIVED = 'Archived';

export const OFFERING_TABLE_NAME = 'marketplace-offerings';
export const PUBLIC_OFFERINGS_FILTER_FORM_ID = 'OfferingsFilter';

export const SERVICE_PROVIDERS_TABLE_NAME =
  'marketplace-service-providers-list';

export const IMAGES_TABLE_NAME = 'marketplace-offering-images';

export const FORM_ID = 'marketplaceOfferingCreate';

export const OFFERING_IMAGES_FORM_ID = 'marketplaceOfferingImages';

export const GOOGLE_CALENDAR_SYNC = 'GoogleCalendarSync';
export const GOOGLE_CALENDAR_PUBLISH = 'GoogleCalendarPublish';
export const GOOGLE_CALENDAR_UNPUBLISH = 'GoogleCalendarUnpublish';

export const PULL_REMOTE_OFFERING_DETAILS =
  'cloudrock/marketplace/offering/PULL_REMOTE_OFFERING_DETAILS';

export const PULL_REMOTE_OFFERING_USERS =
  'cloudrock/marketplace/offering/PULL_REMOTE_OFFERING_USERS';

export const PULL_REMOTE_OFFERING_USAGE =
  'cloudrock/marketplace/offering/PULL_REMOTE_OFFERING_USAGE';

export const PULL_REMOTE_OFFERING_RESOURCES =
  'cloudrock/marketplace/offering/PULL_REMOTE_OFFERING_RESOURCES';

export const PULL_REMOTE_OFFERING_ORDER_ITEMS =
  'cloudrock/marketplace/offering/PULL_REMOTE_OFFERING_ORDER_ITEMS';

export const PULL_REMOTE_OFFERING_INVOICES =
  'cloudrock/marketplace/offering/PULL_REMOTE_OFFERING_INVOICES';

export const updateConfirmationMessage = createFormAction(
  'cloudrock/marketplace/offering/UPDATE_CONFIRMATION_MESSAGE',
);

export const setAccessPolicy = createFormAction(
  'cloudrock/marketplace/offering/SET_ACCESS_POLICY',
);

export const updateOfferingLogo = createFormAction(
  'cloudrock/marketplace/offering/UPDATE_OFFERING_LOGO',
);
