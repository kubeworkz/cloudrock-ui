import { ENV } from '@cloudrock/configs/default';
import { returnReactSelectAsyncPaginateObject } from '@cloudrock/core/utils';
import { getProjectList } from '@cloudrock/marketplace/common/api';

export const projectAutocomplete = async (
  query: string,
  prevOptions,
  currentPage: number,
) => {
  const params = {
    name: query,
    field: ['name', 'uuid'],
    o: 'name',
    page: currentPage,
    page_size: ENV.pageSize,
  };
  const response = await getProjectList(params);
  return returnReactSelectAsyncPaginateObject(
    response,
    prevOptions,
    currentPage,
  );
};
