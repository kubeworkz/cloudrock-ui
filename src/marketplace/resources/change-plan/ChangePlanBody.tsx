import { connect } from 'react-redux';
import { AsyncState } from 'react-use/lib/useAsync';
import { compose } from 'redux';
import { InjectedFormProps, reduxForm } from 'redux-form';

import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { SubmitButton } from '@cloudrock/form';
import { translate } from '@cloudrock/i18n';
import { orderCanBeApproved } from '@cloudrock/marketplace/orders/store/selectors';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';
import { RootState } from '@cloudrock/store/reducers';

import { switchPlan } from '../store/constants';

import { ChangePlanComponent } from './ChangePlanComponent';
import { FetchedData } from './utils';

const FORM_ID = 'marketplaceChangePlan';

const mapStateToProps = (state: RootState) => ({
  orderCanBeApproved: orderCanBeApproved(state),
});

const mapDispatchToProps = (dispatch, ownProps: OwnProps) => ({
  submitRequest: (data) =>
    switchPlan(
      {
        resource: ownProps.asyncState.value.resource,
        plan_url: data.plan.url,
      },
      dispatch,
    ),
});

const connector = compose(
  reduxForm<{ plan: any }, OwnProps>({ form: FORM_ID }),
  connect(mapStateToProps, mapDispatchToProps),
);

interface OwnProps {
  asyncState: AsyncState<FetchedData>;
}

interface DialogBodyProps extends OwnProps, InjectedFormProps {
  submitRequest(data: any): void;
  orderCanBeApproved: boolean;
}

export const DialogBody = connector((props: DialogBodyProps) => (
  <form onSubmit={props.handleSubmit(props.submitRequest)}>
    <ModalDialog
      title={translate('Change resource plan')}
      footer={
        <>
          <CloseDialogButton />
          {!props.asyncState.loading && (
            <SubmitButton
              submitting={props.submitting}
              disabled={!props.asyncState.value.initialValues}
              label={
                props.orderCanBeApproved
                  ? translate('Submit')
                  : translate('Request for a change')
              }
            />
          )}
        </>
      }
    >
      {props.asyncState.loading ? (
        <LoadingSpinner />
      ) : props.asyncState.error ? (
        <h3>{translate('Unable to load data.')}</h3>
      ) : (
        <ChangePlanComponent {...props.asyncState.value} />
      )}
    </ModalDialog>
  </form>
));
