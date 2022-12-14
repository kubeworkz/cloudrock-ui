import { lazyComponent } from '@cloudrock/core/lazyComponent';
import type { Section, Offering } from '@cloudrock/marketplace/types';
import { openModalDialog } from '@cloudrock/modal/actions';

const AttributeFilterListDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "AttributeFilterListDialog" */ '../filters/AttributeFilterListDialog'
    ),
  'AttributeFilterListDialog',
);

import * as constants from './constants';

export const showAttributeFilter = () =>
  openModalDialog(AttributeFilterListDialog, { size: 'sm' });

export const setFilterQuery = (filterQuery: string) => ({
  type: constants.SET_FILTER_QUERY,
  payload: {
    filterQuery,
  },
});

export const loadDataStart = () => ({
  type: constants.LOAD_DATA_START,
});

export const loadDataSuccess = (sections: Section[]) => ({
  type: constants.LOAD_DATA_SUCCESS,
  payload: {
    sections,
  },
});

export const loadDataError = () => ({
  type: constants.LOAD_DATA_ERROR,
});

export const loadOfferingsStart = () => ({
  type: constants.LOAD_OFFERINGS_START,
});

export const loadOfferingsSuccess = (items: Offering[]) => ({
  type: constants.LOAD_OFFERINGS_SUCCESS,
  payload: {
    items,
  },
});

export const loadOfferingsError = () => ({
  type: constants.LOAD_OFFERINGS_ERROR,
});
