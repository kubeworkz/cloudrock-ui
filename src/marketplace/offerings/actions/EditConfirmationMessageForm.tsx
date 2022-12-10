import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';

import { SubmitButton } from '@cloudrock/form';
import { translate } from '@cloudrock/i18n';
import { EDIT_CONFIRMATION_MESSAGE_FORM_ID } from '@cloudrock/marketplace/offerings/actions/constants';
import { updateConfirmationMessage } from '@cloudrock/marketplace/offerings/store/constants';
import { Offering } from '@cloudrock/marketplace/types';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';

import { EditConfirmationMessageFormContainer } from './EditConfirmationMessageFormContainer';

interface EditConfirmationMessageFormOwnProps {
  offering: Offering;
}

interface FormData {
  template_confirmation_comment: string;
}

const PureEditConfirmationMessageForm: FunctionComponent<any> = (props) => (
  <form
    onSubmit={props.handleSubmit(props.submitRequest)}
    className="form-horizontal"
  >
    <ModalDialog
      title={translate('Edit confirmation message of {offeringName}', {
        offeringName: props.offering.name,
      })}
      footer={
        <>
          <CloseDialogButton />
          <SubmitButton
            submitting={props.submitting}
            label={translate('Save')}
          />
        </>
      }
    >
      <EditConfirmationMessageFormContainer submitting={props.submitting} />
    </ModalDialog>
  </form>
);

const mapStateToProps = (_state, ownProps) => ({
  initialValues: {
    template_confirmation_comment:
      ownProps.offering.secret_options.template_confirmation_comment,
  },
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  submitRequest: (formData) =>
    updateConfirmationMessage(
      {
        offeringUuid: ownProps.offering.uuid,
        templateConfirmationMessage: formData.template_confirmation_comment,
        secretOptions: ownProps.offering.secret_options,
      },
      dispatch,
    ),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

const enhance = compose(
  connector,
  reduxForm<FormData, EditConfirmationMessageFormOwnProps>({
    form: EDIT_CONFIRMATION_MESSAGE_FORM_ID,
  }),
);

export const EditConfirmationMessageForm = enhance(
  PureEditConfirmationMessageForm,
);
