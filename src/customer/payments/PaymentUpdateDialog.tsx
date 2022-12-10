import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { InjectedFormProps, reduxForm } from 'redux-form';

import { Link } from '@cloudrock/core/Link';
import { EDIT_PAYMENT_FORM_ID } from '@cloudrock/customer/payments/constants';
import { PaymentProofRenderer } from '@cloudrock/customer/payments/PaymentProofRenderer';
import { updatePayment } from '@cloudrock/customer/payments/store/actions';
import { getInitialValues } from '@cloudrock/customer/payments/utils';
import {
  FileUploadField,
  FormContainer,
  NumberField,
  SubmitButton,
} from '@cloudrock/form';
import { DateField } from '@cloudrock/form/DateField';
import { translate } from '@cloudrock/i18n';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';
import { Payment } from '@cloudrock/workspace/types';

const PaymentUpdateDialog: FunctionComponent<
  InjectedFormProps & { resolve: Payment; submitRequest }
> = (props) => (
  <form
    onSubmit={props.handleSubmit(props.submitRequest)}
    className="form-horizontal"
  >
    <ModalDialog
      title={translate('Update payment')}
      footer={
        <>
          <CloseDialogButton />
          <SubmitButton
            disabled={props.invalid}
            submitting={props.submitting}
            label={translate('Update')}
          />
        </>
      }
    >
      <FormContainer
        submitting={false}
        labelClass="col-sm-2"
        controlClass="col-sm-8"
        clearOnUnmount={false}
      >
        <DateField name="date_of_payment" label={translate('Date')} required />

        <NumberField name="sum" label={translate('Sum')} required />

        <FileUploadField
          name="proof"
          label={translate('Proof')}
          showFileName={true}
          buttonLabel={translate('Browse')}
        />
        {props.resolve.proof ? (
          <span style={{ marginLeft: '145px' }}>
            <PaymentProofRenderer row={props.resolve} />
          </span>
        ) : null}

        {props.resolve.invoice_uuid && props.resolve.invoice_period ? (
          <div className="form-group">
            <label className="control-label col-sm-2">
              {translate('Invoice')}
            </label>
            <div className="col-sm-8" style={{ marginTop: '8px' }}>
              <Link
                state="billingDetails"
                params={{
                  uuid: props.resolve.customer_uuid,
                  invoice_uuid: props.resolve.invoice_uuid,
                }}
                target="_blank"
              >
                {props.resolve.invoice_period}
              </Link>
            </div>
          </div>
        ) : null}
      </FormContainer>
    </ModalDialog>
  </form>
);

const mapStateToProps = (_state, ownProps) => ({
  initialValues: getInitialValues(ownProps),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  submitRequest: (formData) =>
    dispatch(updatePayment(ownProps.resolve.uuid, formData)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

const enhance = compose(
  connector,
  reduxForm({
    form: EDIT_PAYMENT_FORM_ID,
  }),
);

export const PaymentUpdateDialogContainer = enhance(PaymentUpdateDialog);
