import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, formValueSelector } from 'redux-form';

import { required } from '@cloudrock/core/validators';
import {
  FormContainer,
  StringField,
  SubmitButton,
  TextField,
} from '@cloudrock/form';
import { translate } from '@cloudrock/i18n';
import { ImageUploadField } from '@cloudrock/marketplace/offerings/create/ImageUploadField';
import {
  addOfferingImage,
  isAddingOfferingImage,
} from '@cloudrock/marketplace/offerings/store/actions';
import { OFFERING_IMAGES_FORM_ID } from '@cloudrock/marketplace/offerings/store/constants';
import { getOffering } from '@cloudrock/marketplace/offerings/store/selectors';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';
import { RootState } from '@cloudrock/store/reducers';

const AddOfferingImageDialog: FunctionComponent<any> = (props) => (
  <form
    onSubmit={props.handleSubmit(props.submitRequest)}
    className="form-horizontal"
  >
    <ModalDialog
      title={translate('Add image')}
      footer={
        <>
          <CloseDialogButton />
          <SubmitButton
            disabled={props.invalid || !props.imagesField}
            submitting={props.isSubmittingImage}
            label={translate('Submit')}
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
        <ImageUploadField
          name="images"
          label={translate('Image: ')}
          accept={'image/*'}
          buttonLabel={translate('Browse')}
          className="btn btn-default"
          required={true}
        />
        <StringField
          name="name"
          label={translate('Name')}
          required={true}
          validate={required}
          maxLength={150}
        />
        <TextField
          name="description"
          label={translate('Description')}
          required={true}
          validate={required}
          maxLength={2000}
        />
      </FormContainer>
    </ModalDialog>
  </form>
);

const selector = formValueSelector(OFFERING_IMAGES_FORM_ID);

const mapStateToProps = (state: RootState) => ({
  isSubmittingImage: getOffering(state).isAddingImage,
  imagesField: selector(state, 'images'),
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitRequest: (formData) => {
      dispatch(isAddingOfferingImage(true));
      dispatch(addOfferingImage(formData, ownProps.resolve.offering));
    },
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const enhance = compose(
  connector,
  reduxForm({
    form: OFFERING_IMAGES_FORM_ID,
  }),
);

export const CreateImageDialog = enhance(AddOfferingImageDialog);
