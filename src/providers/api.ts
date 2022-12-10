import { ENV } from '@cloudrock/configs/default';
import { patch } from '@cloudrock/core/api';

import { ProviderCreateFormData } from './types';

const serializeDetails = (provider: ProviderCreateFormData) => {
  const serializer = provider.type.serializer || ((x) => x);
  return serializer(provider.options);
};

export const updateProvider = (provider) =>
  patch(`${ENV.apiEndpoint}api/service-settings/${provider.uuid}/`, {
    name: provider.name,
    options: serializeDetails(provider),
  });
