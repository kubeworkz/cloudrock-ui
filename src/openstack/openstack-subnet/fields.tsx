import { FunctionComponent } from 'react';
import { FieldArray } from 'redux-form';

import { translate } from '@cloudrock/i18n';
import { IpAddressList } from '@cloudrock/openstack/openstack-tenant/IpAddressList';
import { StaticRoutesTable } from '@cloudrock/openstack/openstack-tenant/StaticRoutesTable';
import {
  createNameField,
  createDescriptionField,
} from '@cloudrock/resource/actions/base';

const HostRoutesField: FunctionComponent = () => (
  <>
    <div className="form-group">
      <label>{translate('Host routes')}</label>
      <FieldArray name="host_routes" component={StaticRoutesTable} />
    </div>
  </>
);

const NameserversField: FunctionComponent = () => (
  <>
    <div className="form-group">
      <label>{translate('DNS name servers')}</label>
      <FieldArray name="dns_nameservers" component={IpAddressList} />
    </div>
  </>
);

export const getFields = () => [
  createNameField(),
  createDescriptionField(),
  {
    name: 'gateway_ip',
    type: 'string',
    label: translate('Gateway IP of this subnet'),
  },
  {
    name: 'disable_gateway',
    type: 'boolean',
    label: translate('Disable gateway IP advertising via DHCP'),
  },
  {
    name: 'host_routes',
    component: HostRoutesField,
  },
  {
    name: 'dns_nameservers',
    component: NameserversField,
  },
];
