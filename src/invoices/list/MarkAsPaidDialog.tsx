import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

import { FileUploadField, FormContainer, SubmitButton } from '@cloudrock/form';
import { DateField } from '@cloudrock/form/DateField';
import { translate } from '@cloudrock/i18n';
import { MARK_AS_PAID_FORM_ID } from '@cloudrock/invoices/constants';
import { markInvoiceAsPaid } from '@cloudrock/invoices/store/actions';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';

const MarkAsPaidDialogContainer: FunctionComponent<any> = (props) => (
  <form
    onSubmit={props.handleSubmit(props.submitRequest)}
    className="form-horizontal"
  >
    <ModalDialog
      title={translate('Mark invoice as paid')}
      footer={
        <>
          <CloseDialogButton />
          <SubmitButton
            submitting={props.submitting}
            label={translate('Submit')}
          />
        </>
      }
    >
      <div style={{ paddingBottom: '95px' }}>
        <FormContainer
          submitting={props.submitting}
          labelClass="col-sm-2"
          controlClass="col-sm-8"
        >
          <DateField name="date" label={translate('Date')} />

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
    dispatch(markInvoiceAsPaid(formData, ownProps.resolve.uuid)),
});

const connector = connect(null, mapDispatchToProps);

const validate = (values) => {
  const errors: any = {};
  if (values.proof && !values.date) {
    errors.date = { _error: translate('Please, select a date.') };
  }
  return errors;
};

const enhance = compose(
  connector,
  reduxForm({
    form: MARK_AS_PAID_FORM_ID,
    validate,
  }),
);

export const MarkAsPaidDialog = enhance(MarkAsPaidDialogContainer);
