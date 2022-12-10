import Axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import Qs from 'qs';
import { CANCEL } from 'redux-saga';

import { ENV } from '@cloudrock/configs/default';
import { getNextPageUrl, parseResultCount } from '@cloudrock/core/api';

import { Fetcher, TableRequest } from './types';

export function getNextPageNumber(link: string): number {
  if (link) {
    const parts = Qs.parse(link.split('/?')[1]);
    if (parts && typeof parts.page === 'string') {
      return parseInt(parts.page, 10);
    }
  } else {
    return null;
  }
}

export const parseResponse = (url, params, options?: AxiosRequestConfig) =>
  Axios.request({
    method: 'GET',
    url,
    params,
    ...options,
  }).then((response: AxiosResponse<any>) => {
    const resultCount = parseResultCount(response);
    return {
      rows: Array.isArray(response.data) ? response.data : [],
      resultCount,
      nextPage: getNextPageNumber(getNextPageUrl(response)),
    };
  });

export function createFetcher(
  endpoint: string,
  options?: AxiosRequestConfig,
): Fetcher {
  return (request: TableRequest) => {
    const source = Axios.CancelToken.source();
    const url = `${ENV.apiEndpoint}api/${endpoint}/`;
    const params = {
      page: request.currentPage,
      page_size: request.pageSize,
      ...request.filter,
    };
    const axiosRequest = parseResponse(url, params, {
      ...options,
      cancelToken: source.token,
    });
    // See also: https://github.com/redux-saga/redux-saga/issues/651
    axiosRequest[CANCEL] = () => source.cancel();
    return axiosRequest;
  };
}

export async function fetchAll(
  fetch: Fetcher,
  filter?: Record<string, string>,
) {
  const request: TableRequest = {
    pageSize: 50,
    currentPage: 1,
    filter,
  };

  let response = await fetch(request);
  let result = [];

  // eslint-disable-next-line no-constant-condition
  while (true) {
    result = result.concat(response.rows);
    if (response.nextPage) {
      request.currentPage = response.nextPage;
      response = await fetch(request);
    } else {
      break;
    }
  }
  return result;
}

export const ANONYMOUS_CONFIG = {
  transformRequest: [
    (data, headers) => {
      delete headers.common.Authorization;
      return data;
    },
  ],
};
