import { getEventsTab } from '@cloudrock/resource/tabs/constants';
import { ResourceTabsConfiguration } from '@cloudrock/resource/tabs/ResourceTabsConfiguration';

ResourceTabsConfiguration.register('OpenStack.SubNet', () => [getEventsTab()]);
