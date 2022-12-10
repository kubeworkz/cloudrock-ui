import { connect } from 'react-redux';
import { compose } from 'redux';
import { InjectedFormProps, reduxForm, Field } from 'redux-form';

import { SubmitButton } from '@cloudrock/form';
import { translate } from '@cloudrock/i18n';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';

import { updateOfferingState } from '../store/actions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  submitRequest: (formData) => {
    dispatch(
      updateOfferingState(
        ownProps.resolve.offering,
        'pause',
        formData.reason,
        ownProps.resolve.isPublic,
        ownProps.resolve.refreshOffering,
      ),
    );
  },
});

const connector = compose(
  reduxForm({ form: 'marketplacePauseOffering' }),
  connect(null, mapDispatchToProps),
);

interface PauseOfferingDialogProps extends InjectedFormProps {
  submitRequest(formData: any): void;
}

export const PauseOfferingDialog = connector(
  (props: PauseOfferingDialogProps) => (
    <form onSubmit={props.handleSubmit(props.submitRequest)}>
      <ModalDialog
        title={translate('Pause offering')}
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
        <Field
          name="reason"
          className="form-control"
          component="textarea"
          placeholder={translate(
            'Please enter reason why offering has been paused.',
          )}
          rows={7}
        />
      </ModalDialog>
    </form>
  ),
);
