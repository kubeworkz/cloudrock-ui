import { getFormValues } from 'redux-form';

import { formatErrorObject } from '@cloudrock/core/ErrorMessageFormatter';
import { FORM_ID } from '@cloudrock/marketplace/details/constants';
import { RootState } from '@cloudrock/store/reducers';

export const getCategoryLink = (projectId, categoryId) => ({
  state: 'marketplace-project-resources',
  params: {
    uuid: projectId,
    category_uuid: categoryId,
  },
});

export const formDataSelector = (state: RootState) =>
  (getFormValues(FORM_ID)(state) || {}) as any;

export const formatResourceShort = (resource) => {
  return (
    (resource.name ? resource.name : resource.uuid) +
    ' (' +
    resource.offering_name +
    ')'
  );
};

export const handleMarketplaceErrorResponse = (
  response,
  message: string,
): string => {
  if (response.data.components && Array.isArray(response.data.components)) {
    message +=
      ' ' +
      response.data.components
        .map((component) => {
          if (typeof component === 'object') {
            return formatErrorObject(component);
          } else {
            return component;
          }
        })
        .join('. ');
  }
  return message;
};
