import { triggerTransition } from '@uirouter/redux';

import { isFeatureVisible } from '@cloudrock/features/connect';
import { translate } from '@cloudrock/i18n';
import store from '@cloudrock/store/store';

export const getFlowCreateAction = () => {
  if (!isFeatureVisible('marketplace.flows')) {
    return;
  }
  return {
    title: translate('Create resource'),
    onClick() {
      store.dispatch(triggerTransition('marketplace-landing-user', {}));
    },
  };
};
