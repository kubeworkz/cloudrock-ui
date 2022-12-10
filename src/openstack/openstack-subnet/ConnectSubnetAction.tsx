import { translate } from '@cloudrock/i18n';
import { connectSubnet } from '@cloudrock/openstack/api';
import { AsyncActionItem } from '@cloudrock/resource/actions/AsyncActionItem';
import { validateState } from '@cloudrock/resource/actions/base';

export const ConnectSubnetAction = ({ resource }) => (
  <AsyncActionItem
    title={translate('Connect subnet')}
    apiMethod={connectSubnet}
    resource={resource}
    validators={[validateState('OK')]}
  />
);
