import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { getEventsTab } from '@cloudrock/resource/tabs/constants';
import { ResourceTabsConfiguration } from '@cloudrock/resource/tabs/ResourceTabsConfiguration';

const SecurityGroupRulesList = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "SecurityGroupRulesList" */ './SecurityGroupRulesList'
    ),
  'SecurityGroupRulesList',
);

ResourceTabsConfiguration.register('OpenStack.SecurityGroup', () => [
  {
    key: 'rules',
    title: translate('Rules'),
    component: SecurityGroupRulesList,
  },
  getEventsTab(),
]);
