import { DateTime } from 'luxon';
import { FunctionComponent } from 'react';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';

import { formatDate } from '@cloudrock/core/dateUtils';
import { FormContainer, SubmitButton } from '@cloudrock/form';
import { DateField } from '@cloudrock/form/DateField';
import { datePickerOverlayContainerInDialogs } from '@cloudrock/form/utils';
import { translate } from '@cloudrock/i18n';
import { Resource } from '@cloudrock/marketplace/resources/types';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';
import { showErrorResponse, showSuccess } from '@cloudrock/store/notify';

import { EDIT_RESOURCE_END_DATE_FORM_ID } from './constants';

interface EditResourceEndDateDialogOwnProps {
  resource: Resource;
  reInitResource?(): void;
  refreshList?(): void;
  updateEndDate?(uuid: string, date: string);
}

interface FormData {
  end_date: string;
}

const PureEditResourceEndDateDialog: FunctionComponent<any> = (props) => {
  const dispatch = useDispatch();

  const submitRequest = async (formData: FormData) => {
    try {
      await props.resolve.updateEndDate(
        props.resolve.resource.uuid,
        formData.end_date ? formatDate(formData.end_date) : null,
      );
      dispatch(
        showSuccess(
          translate('{resourceName} resource has been updated successfully.', {
            resourceName: props.resolve.resource.name,
          }),
        ),
      );
      if (props.resolve.reInitResource) {
        await props.resolve.reInitResource();
      } else if (props.resolve.refreshList) {
        props.resolve.refreshList();
      }
      dispatch(closeModalDialog());
    } catch (error) {
      dispatch(showErrorResponse(error, translate('Unable to edit resource.')));
    }
  };

  return (
    <form onSubmit={props.handleSubmit(submitRequest)}>
      <ModalDialog
        title={translate('Set termination date of {resourceName}', {
          resourceName: props.resolve.resource.name,
        })}
        footer={
          <>
            <CloseDialogButton />
            <SubmitButton
              submitting={props.submitting}
              label={translate('Save')}
              disabled={props.invalid}
            />
          </>
        }
      >
        <FormContainer submitting={props.submitting}>
          <Field
            name="end_date"
            label={translate('Termination date')}
            component={DateField}
            {...datePickerOverlayContainerInDialogs()}
            disabled={props.submitting}
            description={translate(
              'The date is inclusive. Once reached, resource will be scheduled for termination.',
            )}
            minDate={DateTime.now().plus({ weeks: 1 }).toISO()}
          />
        </FormContainer>
      </ModalDialog>
    </form>
  );
};

const mapStateToProps = (_state, ownProps) => ({
  initialValues: {
    end_date: ownProps.resolve.resource.end_date,
  },
});

const connector = connect(mapStateToProps);

const enhance = compose(
  connector,
  reduxForm<FormData, EditResourceEndDateDialogOwnProps>({
    form: EDIT_RESOURCE_END_DATE_FORM_ID,
  }),
);

export const EditResourceEndDateDialog = enhance(PureEditResourceEndDateDialog);
