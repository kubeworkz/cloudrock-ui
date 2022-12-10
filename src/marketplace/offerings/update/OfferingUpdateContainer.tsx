import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

import * as actions from '@cloudrock/marketplace/offerings/store/actions';
import { router } from '@cloudrock/router';
import { RootState } from '@cloudrock/store/reducers';

import { mergeProps } from '../create/OfferingCreateContainer';
import { updateOffering, FORM_ID } from '../store/constants';
import {
  getStep,
  isOfferingManagementDisabled,
  getReadOnlyFields,
  isLoading,
  isLoaded,
  isErred,
} from '../store/selectors';
import { OfferingStep } from '../types';

import { OfferingUpdateDialog } from './OfferingUpdateDialog';
import { getInitialValues } from './utils';

const mapStateToProps = (state: RootState) => ({
  step: getStep(state),
  disabled: isOfferingManagementDisabled(state),
  readOnlyFields: getReadOnlyFields(state),
  initialValues: getInitialValues(state),
  loading: isLoading(state),
  loaded: isLoaded(state),
  erred: isErred(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateOffering: (data) =>
    updateOffering(
      {
        ...data,
        offeringUuid: router.globals.params.offering_uuid,
      },
      dispatch,
    ),
  loadOffering: (offeringUuid) =>
    dispatch(actions.loadOfferingStart(offeringUuid)),
  setStep: (step: OfferingStep) => dispatch(actions.setStep(step)),
  setIsUpdatingOffering: (state: boolean) =>
    dispatch(actions.isUpdatingOffering(state)),
});

const connector = connect(mapStateToProps, mapDispatchToProps, mergeProps);

const enhance = compose(
  connector,
  reduxForm({
    form: FORM_ID,
    enableReinitialize: true,
  }),
);

export const OfferingUpdateContainer = enhance(OfferingUpdateDialog);
