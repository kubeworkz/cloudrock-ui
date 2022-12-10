import { isVisible } from '@cloudrock/store/config';
import store from '@cloudrock/store/store';

export const isFeatureVisible = (feature: string) =>
  isVisible(store.getState(), feature);
