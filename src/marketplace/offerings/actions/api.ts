import { post } from '@cloudrock/core/api';
import { Offering } from '@cloudrock/marketplace/types';
import { Customer } from '@cloudrock/workspace/types';

export const loadRemoteOfferings = (api_url, token, customer_uuid) =>
  post<Offering[]>(
    '/remote-cloudrock-api/shared_offerings/',
    { api_url, token },
    { params: { customer_uuid } },
  ).then((response) => response.data);

export const loadRemoteOrganizations = (formData) =>
  post<Customer[]>('/remote-cloudrock-api/remote_customers/', formData).then(
    (response) => response.data,
  );

export const importOffering = (payload) =>
  post<{ uuid: string }>('/remote-cloudrock-api/import_offering/', payload);
