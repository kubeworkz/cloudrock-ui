import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFormValues } from 'redux-form';

import { withTranslation, TranslateProps } from '@cloudrock/i18n';
import { RootState } from '@cloudrock/store/reducers';

import * as actions from '../store/actions';
import { MARKETPLACE_FILTER_FORM } from '../store/constants';
import { countSelectedFilters } from '../utils';

interface MobileFilterActionsProps extends TranslateProps {
  showAttributeFilterDialog?(): void;
  filterValues?: any;
}

export const PureMobileFilterActions: React.FC<MobileFilterActionsProps> = (
  props,
) => (
  <button
    type="button"
    className="btn btn-primary btn-info"
    onClick={props.showAttributeFilterDialog}
  >
    <i className="fa fa-filter" /> {props.translate('Filter')}{' '}
    {props.filterValues && `(${countSelectedFilters(props.filterValues)})`}
  </button>
);

const mapDispatchToProps = (dispatch) => ({
  showAttributeFilterDialog: () => dispatch(actions.showAttributeFilter()),
});

const mapStateToProps = (state: RootState) => ({
  filterValues: getFormValues(MARKETPLACE_FILTER_FORM)(state),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation,
);

export const MobileFilterActions = enhance(PureMobileFilterActions);
