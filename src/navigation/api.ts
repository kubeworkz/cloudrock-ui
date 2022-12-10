import { parseResultCount } from '@cloudrock/core/api';
import { getProviderOfferingsByServiceProvider } from '@cloudrock/marketplace/common/api';
import { ANONYMOUS_CONFIG } from '@cloudrock/table/api';

export const fetchOfferings = async (keyword: string, pageIndex: number) => {
  if (!keyword) {
    return [];
  }
  const response = await getProviderOfferingsByServiceProvider({
    ...ANONYMOUS_CONFIG,
    params: {
      keyword,
      page: pageIndex,
      page_size: 3,
      shared: true,
      billable: true,
      state: 'Active',
    },
  });
  return {
    items: Array.isArray(response.data) ? response.data : [],
    totalItems: parseResultCount(response),
  };
};
