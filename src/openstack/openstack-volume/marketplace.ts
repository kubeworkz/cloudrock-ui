import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { registerOfferingType } from '@cloudrock/marketplace/common/registry';
import { OfferingConfigurationFormProps } from '@cloudrock/marketplace/types';

const OpenstackVolumeDetails = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "OpenstackVolumeDetails" */ '@cloudrock/openstack/openstack-volume/OpenstackVolumeDetails'
    ),
  'OpenstackVolumeDetails',
);
const OpenstackVolumeCheckoutSummary = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "OpenstackVolumeCheckoutSummary" */ '@cloudrock/openstack/openstack-volume/OpenstackVolumeCheckoutSummary'
    ),
  'OpenstackVolumeCheckoutSummary',
);
const OpenstackVolumeCreateForm = lazyComponent<OfferingConfigurationFormProps>(
  () =>
    import(
      /* webpackChunkName: "OpenstackVolumeCreateForm" */ './OpenstackVolumeCreateForm'
    ),
  'OpenstackVolumeCreateForm',
);

const serializer = (attrs) => ({
  ...attrs,
  type: attrs.type && attrs.type.value,
});

registerOfferingType({
  type: 'OpenStackTenant.Volume',
  get label() {
    return translate('OpenStack volume');
  },
  component: OpenstackVolumeCreateForm,
  detailsComponent: OpenstackVolumeDetails,
  checkoutSummaryComponent: OpenstackVolumeCheckoutSummary,
  serializer,
  disableOfferingCreation: true,
  allowToUpdateService: true,
});
