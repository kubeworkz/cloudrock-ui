import { AxiosRequestConfig } from 'axios';
import { DateTime } from 'luxon';

import { ENV } from '@cloudrock/configs/default';
import { getAll } from '@cloudrock/core/api';
import { ComponentUsage } from '@cloudrock/marketplace/resources/usage/types';
import { parseResponse } from '@cloudrock/table/api';
import { Fetcher, TableRequest } from '@cloudrock/table/types';

export const fetchOfferingCustomers: Fetcher = (request: TableRequest) => {
  const { offering_uuid, ...rest } = request.filter;
  const url = `${ENV.apiEndpoint}api/marketplace-provider-offerings/${offering_uuid}/customers/`;
  const params = {
    page: request.currentPage,
    page_size: request.pageSize,
    ...rest,
  };
  return parseResponse(url, params);
};

export const getOfferingCostChartData = (
  accounting_is_running: boolean,
  offeringUuid: string,
) =>
  getAll(`/marketplace-provider-offerings/${offeringUuid}/costs/`, {
    params: {
      accounting_is_running,
      start: DateTime.now().minus({ months: 11 }).toFormat('yyyy-MM'),
      end: DateTime.now().toFormat('yyyy-MM'),
    },
  }).then((response) => response);

export const getOfferingComponentStats = (
  offeringUuid: string,
  options?: AxiosRequestConfig,
) =>
  getAll<ComponentUsage>(
    `/marketplace-provider-offerings/${offeringUuid}/component_stats/`,
    options,
  );
