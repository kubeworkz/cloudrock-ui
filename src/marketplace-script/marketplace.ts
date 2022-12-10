import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { registerOfferingType } from '@cloudrock/marketplace/common/registry';
import { serializer } from '@cloudrock/support/serializer';

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
const ScriptsForm = lazyComponent(
  () => import(/* webpackChunkName: "ScriptsForm" */ './ScriptsForm'),
  'ScriptsForm',
);

registerOfferingType({
  type: 'Marketplace.Script',
  get label() {
    return translate('Custom scripts');
  },
  component: OfferingConfigurationForm,
  detailsComponent: OfferingConfigurationDetails,
  secretOptionsForm: ScriptsForm,
  serializer,
  showOptions: true,
  showComponents: true,
  allowToUpdateService: true,
});
