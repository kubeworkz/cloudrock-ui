import { combineReducers } from 'redux';

import { cartReducer } from '@cloudrock/marketplace/cart/store/reducer';
import {
  categoryReducer,
  categoryOfferingsReducer,
} from '@cloudrock/marketplace/category/store/reducers';
import { comparisonReducer } from '@cloudrock/marketplace/compare/store/reducers';
import { landingReducer } from '@cloudrock/marketplace/landing/store/reducer';
import { offeringReducer } from '@cloudrock/marketplace/offerings/store/reducer';
import { ordersReducer } from '@cloudrock/marketplace/orders/store/reducer';
import { serviceProviderReducer } from '@cloudrock/marketplace/service-providers/store/reducer';

export const reducer = combineReducers({
  comparison: comparisonReducer,
  cart: cartReducer,
  offering: offeringReducer,
  landing: landingReducer,
  orders: ordersReducer,
  category: categoryReducer,
  categoryOfferings: categoryOfferingsReducer,
  serviceProvider: serviceProviderReducer,
});
