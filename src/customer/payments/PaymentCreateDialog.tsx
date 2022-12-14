import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

import { ADD_PAYMENT_FORM_ID } from '@cloudrock/customer/payments/constants';
import { createPayment } from '@cloudrock/customer/payments/store/actions';
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

const PaymentCreateDialog: FunctionComponent<any> = (props) => (
  <form
    onSubmit={props.handleSubmit(props.submitRequest)}
    className="form-horizontal"
  >
    <ModalDialog
      title={translate('Add payment')}
      footer={
        <>
          <CloseDialogButton />
          <SubmitButton
            disabled={props.invalid}
            submitting={props.submitting}
            label={translate('Submit')}
          />
        </>
      }
    >
      <div style={{ paddingBottom: '50px' }}>
        <FormContainer
          submitting={false}
          labelClass="col-sm-2"
          controlClass="col-sm-8"
          clearOnUnmount={false}
        >
          <DateField
            name="date_of_payment"
            label={translate('Date')}
            required
          />

          <NumberField name="sum" label={translate('Sum')} required />

          <FileUploadField
            name="proof"
            label={translate('Proof')}
            showFileName={true}
            buttonLabel={translate('Browse')}
          />
        </FormContainer>
      </div>
    </ModalDialog>
  </form>
);

const mapDispatchToProps = (dispatch, ownProps) => ({
  submitRequest: (formData) =>
    dispatch(
      createPayment({
        formData: formData,
        profile_url: ownProps.resolve.profileUrl,
      }),
    ),
});

const connector = connect(null, mapDispatchToProps);

const enhance = compose(
  connector,
  reduxForm({
    form: ADD_PAYMENT_FORM_ID,
  }),
);

export const PaymentCreateDialogContainer = enhance(PaymentCreateDialog);
