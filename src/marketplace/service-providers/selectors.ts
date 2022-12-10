import { createSelector } from 'reselect';

import { RootState } from '@cloudrock/store/reducers';
import { isStaff, isOwner } from '@cloudrock/workspace/selectors';

const ownerCanRegisterServiceProvider = (state: RootState): boolean =>
  state.config.plugins.CLOUDROCK_MARKETPLACE.OWNER_CAN_REGISTER_SERVICE_PROVIDER;

export const renderServiceProvider = createSelector(
  ownerCanRegisterServiceProvider,
  isStaff,
  (ownerCan, staff) => staff || ownerCan,
);

export const canRegisterServiceProviderForCustomer = createSelector(
  ownerCanRegisterServiceProvider,
  isStaff,
  isOwner,
  (ownerCan, staff, owner) => staff || (ownerCan && owner),
);
