import Axios from 'axios';

import { ENV } from '@cloudrock/configs/default';
import { parseResultCount } from '@cloudrock/core/api';

export const getCustomersCount = () =>
  Axios.head(`${ENV.apiEndpoint}api/customers/`, {
    params: { archived: false },
  }).then((response) => parseResultCount(response));

export const getCustomersPage = (query, page, pageSize) =>
  Axios.get(`${ENV.apiEndpoint}api/customers/`, {
    params: {
      archived: false,
      page: page + 1,
      page_size: pageSize,
      field: [
        'name',
        'uuid',
        'projects',
        'owners',
        'service_managers',
        'abbreviation',
        'is_service_provider',
      ],
      o: 'name',
      query,
    },
  }).then((response) => ({
    pageElements: response.data,
    itemCount: parseResultCount(response),
  }));
