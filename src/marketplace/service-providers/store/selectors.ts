import { RootState } from '@cloudrock/store/reducers';

export const getServiceProviderSecretCode = (state: RootState) =>
  state.marketplace.serviceProvider.secretCode;
