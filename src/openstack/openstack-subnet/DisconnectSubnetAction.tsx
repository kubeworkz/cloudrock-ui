import { translate } from '@cloudrock/i18n';
import { disconnectSubnet } from '@cloudrock/openstack/api';
import { AsyncActionItem } from '@cloudrock/resource/actions/AsyncActionItem';
import { validateState } from '@cloudrock/resource/actions/base';

export const DisconnectSubnetAction = ({ resource }) => (
  <AsyncActionItem
    title={translate('Disconnect subnet')}
    apiMethod={disconnectSubnet}
    resource={resource}
    validators={[validateState('OK')]}
  />
);
