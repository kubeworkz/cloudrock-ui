import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { getEventsTab } from '@cloudrock/resource/tabs/constants';
import { ResourceTabsConfiguration } from '@cloudrock/resource/tabs/ResourceTabsConfiguration';

const ServerGroupMemberList = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "ServerGroupMemberList" */ '../openstack-server-groups/ServerGroupMemberList'
    ),
  'ServerGroupMemberList',
);

ResourceTabsConfiguration.register('OpenStack.ServerGroup', () => [
  {
    key: 'members',
    title: translate('Members'),
    component: ServerGroupMemberList,
  },
  getEventsTab(),
]);
