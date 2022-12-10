import { useDispatch } from 'react-redux';
import { reduxForm } from 'redux-form';

import { FormContainer, SubmitButton, TextField } from '@cloudrock/form';
import { translate } from '@cloudrock/i18n';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';
import { showErrorResponse, showSuccess } from '@cloudrock/store/notify';

interface OwnProps {
  resolve: { refreshList(): void; apiMethod; resource };
}

const enhance = reduxForm<{}, OwnProps>({
  form: 'ReviewDialog',
});

export const ReviewDialog = enhance(
  ({ resolve, invalid, submitting, handleSubmit }) => {
    const dispatch = useDispatch();
    const setRoutes = async (formData) => {
      try {
        await resolve.apiMethod(resolve.resource.uuid, formData.review_comment);
        resolve.refreshList();
        dispatch(showSuccess(translate('Review has been submitted.')));
        dispatch(closeModalDialog());
      } catch (e) {
        dispatch(showErrorResponse(e, translate('Unable to submit review.')));
      }
    };

    return (
      <form onSubmit={handleSubmit(setRoutes)} className="form-horizontal">
        <ModalDialog
          title={translate('Review request')}
          footer={
            <>
              <CloseDialogButton />
              <SubmitButton
                disabled={invalid}
                submitting={submitting}
                label={translate('Submit')}
              />
            </>
          }
        >
          <FormContainer submitting={submitting}>
            <TextField label={translate('Comment')} name="review_comment" />
          </FormContainer>
        </ModalDialog>
      </form>
    );
  },
);
