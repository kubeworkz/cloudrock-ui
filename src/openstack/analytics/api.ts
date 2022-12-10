import { getList } from '@cloudrock/core/api';

export const loadServiceProviders = () =>
  getList('/service-settings/', {
    type: 'OpenStackTenant',
  });
