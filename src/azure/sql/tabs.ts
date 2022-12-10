import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { getEventsTab } from '@cloudrock/resource/tabs/constants';
import { ResourceTabsConfiguration } from '@cloudrock/resource/tabs/ResourceTabsConfiguration';

const DatabasesList = lazyComponent(
  () => import(/* webpackChunkName: "DatabasesList" */ './DatabasesList'),
  'DatabasesList',
);

ResourceTabsConfiguration.register('Azure.SQLServer', () => [
  {
    key: 'databases',
    title: translate('Databases'),
    component: DatabasesList,
  },
  getEventsTab(),
]);
