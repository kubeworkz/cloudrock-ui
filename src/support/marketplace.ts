import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { registerOfferingType } from '@cloudrock/marketplace/common/registry';

import { BASIC_OFFERING_TYPE, SUPPORT_OFFERING_TYPE } from './constants';
import { serializer } from './serializer';

const OfferingConfigurationDetails = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "OfferingConfigurationDetails" */ '@cloudrock/support/OfferingConfigurationDetails'
    ),
  'OfferingConfigurationDetails',
);
const OfferingConfigurationForm = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "OfferingConfigurationForm" */ '@cloudrock/support/OfferingConfigurationForm'
    ),
  'OfferingConfigurationForm',
);
const OfferingPluginOptionsForm = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "OfferingPluginOptionsForm" */ './OfferingPluginOptionsForm'
    ),
  'OfferingPluginOptionsForm',
);
const OfferingPluginSecretOptionsForm = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "OfferingPluginSecretOptionsForm" */ './OfferingPluginSecretOptionsForm'
    ),
  'OfferingPluginSecretOptionsForm',
);

export const COMMON_OPTIONS = {
  component: OfferingConfigurationForm,
  detailsComponent: OfferingConfigurationDetails,
  pluginOptionsForm: OfferingPluginOptionsForm,
  secretOptionsForm: OfferingPluginSecretOptionsForm,
  serializer,
  showOptions: true,
  showComponents: true,
};

registerOfferingType({
  type: SUPPORT_OFFERING_TYPE,
  get label() {
    return translate('Request-based item');
  },
  ...COMMON_OPTIONS,
});

registerOfferingType({
  type: BASIC_OFFERING_TYPE,
  get label() {
    return translate('Request-based item (without Service Desk)');
  },
  ...COMMON_OPTIONS,
});
