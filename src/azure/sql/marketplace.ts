import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { registerOfferingType } from '@cloudrock/marketplace/common/registry';

const AzureSQLServerDetails = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "AzureSQLServerDetails" */ './AzureSQLServerDetails'
    ),
  'AzureSQLServerDetails',
);
const AzureSQLServerForm = lazyComponent(
  () =>
    import(/* webpackChunkName: "AzureSQLServerForm" */ './AzureSQLServerForm'),
  'AzureSQLServerForm',
);

registerOfferingType({
  type: 'Azure.SQLServer',
  get label() {
    return translate('Azure PostgreSQL database server');
  },
  component: AzureSQLServerForm,
  detailsComponent: AzureSQLServerDetails,
  providerType: 'Azure',
  allowToUpdateService: true,
});
