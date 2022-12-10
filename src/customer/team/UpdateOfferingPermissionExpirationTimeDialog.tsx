import { useCallback } from 'react';
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';

import { SubmitButton } from '@cloudrock/auth/SubmitButton';
import { FormContainer } from '@cloudrock/form';
import { DateField } from '@cloudrock/form/DateField';
import { datePickerOverlayContainerInDialogs } from '@cloudrock/form/utils';
import { translate } from '@cloudrock/i18n';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { showErrorResponse, showSuccess } from '@cloudrock/store/notify';
import { fetchListStart } from '@cloudrock/table/actions';
import { getCustomer } from '@cloudrock/workspace/selectors';

import { updatePermission } from './api';
import {
  OFFERING_PERMISSIONS_LIST_ID,
  UPDATE_OFFERING_PERMISSION_EXPIRATION_TIME_FORM_ID,
} from './constants';

const PureUpdateOfferingPermissionExpirationTimeDialog = (props) => {
  const dispatch = useDispatch();
  const customer = useSelector(getCustomer);
  const update = useCallback(
    async (formData) => {
      try {
        await updatePermission(
          props.resolve.permission.pk,
          formData.expiration_time,
        );
        dispatch(
          showSuccess(translate('Permission has been updated successfully.')),
        );
        dispatch(closeModalDialog());
        dispatch(
          fetchListStart(OFFERING_PERMISSIONS_LIST_ID, {
            customer_uuid: customer.uuid,
          }),
        );
      } catch (error) {
        dispatch(
          showErrorResponse(error, translate('Unable to update permission.')),
        );
      }
    },
    [dispatch, customer],
  );
  return (
    <form onSubmit={props.handleSubmit(update)}>
      <ModalHeader>
        <ModalTitle>
          {translate('Update permission of {name}', {
            name: props.resolve.permission.offering_name,
          })}
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <FormContainer submitting={props.submitting}>
          <Field
            name="expiration_time"
            label={translate('Expiration time')}
            component={DateField}
            {...datePickerOverlayContainerInDialogs()}
          />
        </FormContainer>
      </ModalBody>
      <ModalFooter>
        <SubmitButton block={false} submitting={props.submitting}>
          {translate('Update')}
        </SubmitButton>
        <CloseDialogButton />
      </ModalFooter>
    </form>
  );
};

const mapStateToProps = (_state, ownProps) => ({
  initialValues: {
    expiration_time: ownProps.resolve.permission.expiration_time,
  },
});

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: UPDATE_OFFERING_PERMISSION_EXPIRATION_TIME_FORM_ID,
  }),
);

export const UpdateOfferingPermissionExpirationTimeDialog = enhance(
  PureUpdateOfferingPermissionExpirationTimeDialog,
);
