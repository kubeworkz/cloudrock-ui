import { connect } from 'react-redux';
import { compose } from 'redux';

import { withTranslation } from '@cloudrock/i18n';
import { DescriptionStep } from '@cloudrock/marketplace/offerings/create/DescriptionStep';
import * as actions from '@cloudrock/marketplace/offerings/store/actions';

import { getCategory, getCategories } from '../store/selectors';

const mapStateToProps = (state) => ({
  category: getCategory(state),
  categories: getCategories(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCategoryChange: (category) => dispatch(actions.categoryChanged(category)),
});

const connector = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation,
);

export const DescriptionUpdateContainer = connector((props) => {
  return <DescriptionStep {...props} layout="vertical" />;
});
