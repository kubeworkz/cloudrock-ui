import { connect } from 'react-redux';

import { router } from '@cloudrock/router';
import { RootState } from '@cloudrock/store/reducers';

import * as selectors from '../landing/store/selectors';

import { ShopCategories } from './ShopCategories';

const enhance = connect((state: RootState) => ({
  categories: selectors.getCategories(state).items,
  currentCategoryUuid: router.globals.params.category_uuid,
}));

export const ShopCategoriesContainer = enhance(ShopCategories);
