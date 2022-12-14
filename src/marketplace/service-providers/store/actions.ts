import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { openModalDialog } from '@cloudrock/modal/actions';

const ServiceProviderSecretCodeGenerateConfirm = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "ServiceProviderSecretCodeGenerateConfirm" */ '../ServiceProviderSecretCodeGenerateConfirm'
    ),
  'ServiceProviderSecretCodeGenerateConfirm',
);

import * as constants from './constants';

export const showSecretCodeRegenerateConfirm = (serviceProvider) =>
  openModalDialog(ServiceProviderSecretCodeGenerateConfirm, {
    resolve: { serviceProvider },
    size: 'lg',
  });

export const secretCodeRegenerateStart = (serviceProvider) => ({
  type: constants.SERVICE_PROVIDER_CODE_REGENERATE_START,
  payload: {
    serviceProvider,
  },
});

export const secretCodeRegenerateSuccess = (code) => ({
  type: constants.SERVICE_PROVIDER_CODE_REGENERATE_SUCCESS,
  payload: {
    code,
  },
});

export const secretCodeRegenerateError = () => ({
  type: constants.SERVICE_PROVIDER_CODE_REGENERATE_ERROR,
});

export const secretCodeFetchStart = (serviceProvider) => ({
  type: constants.SERVICE_PROVIDER_CODE_FETCH_START,
  payload: {
    serviceProvider,
  },
});

export const secretCodeFetchSuccess = (code) => ({
  type: constants.SERVICE_PROVIDER_CODE_FETCH_SUCCESS,
  payload: {
    code,
  },
});
