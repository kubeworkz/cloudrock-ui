import { ENV } from '@cloudrock/configs/default';
import { getList, getSelectData } from '@cloudrock/core/api';
import { PROJECT_MANAGER_ROLE } from '@cloudrock/core/constants';
import { returnReactSelectAsyncPaginateObject } from '@cloudrock/core/utils';
import { parseResponse } from '@cloudrock/table/api';
import { Fetcher, TableRequest } from '@cloudrock/table/types';
import { User } from '@cloudrock/workspace/types';

export const fetchProjectUsers: Fetcher = (request: TableRequest) => {
  const { project_uuid, ...rest } = request.filter;
  const url = `${ENV.apiEndpoint}api/projects/${project_uuid}/users/`;
  const params = {
    page: request.currentPage,
    page_size: request.pageSize,
    ...rest,
  };
  return parseResponse(url, params);
};

export const fetchProjectManagers = (user, project) =>
  getList('/project-permissions/', {
    user_url: user.url,
    project: project.uuid,
    role: PROJECT_MANAGER_ROLE,
  });

export const usersAutocomplete = async (
  customerUuid: string,
  query: object,
  prevOptions,
  currentPage: number,
) => {
  const params = {
    o: 'full_name',
    ...query,
    page: currentPage,
    page_size: ENV.pageSize,
  };
  const response = await getSelectData<User[]>(
    `/customers/${customerUuid}/users/`,
    params,
  );
  return returnReactSelectAsyncPaginateObject(
    response,
    prevOptions,
    currentPage,
  );
};
