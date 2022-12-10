import { DateTime } from 'luxon';
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { reduxForm } from 'redux-form';

import { SubmitButton } from '@cloudrock/auth/SubmitButton';
import { ProjectPermissionsService } from '@cloudrock/customer/services/ProjectPermissionsService';
import { usersAutocomplete } from '@cloudrock/customer/team/api';
import { getRoles } from '@cloudrock/customer/team/utils';
import { FormContainer, SelectField } from '@cloudrock/form';
import { AsyncSelectField } from '@cloudrock/form/AsyncSelectField';
import { DateField } from '@cloudrock/form/DateField';
import {
  reactSelectMenuPortaling,
  datePickerOverlayContainerInDialogs,
} from '@cloudrock/form/utils';
import { translate } from '@cloudrock/i18n';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { UserListOptionInline } from '@cloudrock/project/team/UserGroup';
import { showErrorResponse } from '@cloudrock/store/notify';
import { getProject } from '@cloudrock/workspace/selectors';

const FORM_ID = 'AddProjectUserDialog';

interface AddProjectUserDialogFormData {
  role: string;
  expiration_time: string;
  user: any;
}

export const AddProjectUserDialog = reduxForm<
  AddProjectUserDialogFormData,
  { refreshList }
>({
  form: FORM_ID,
})(({ submitting, handleSubmit, refreshList }) => {
  const dispatch = useDispatch();
  const currentProject = useSelector(getProject);

  const getOptionLabel = (option) =>
    option.email
      ? (option.full_name || option.username) + ` (${option.email})`
      : option.full_name || option.username;

  const saveUser = async (formData) => {
    try {
      await ProjectPermissionsService.create({
        user: formData.user.url,
        project: currentProject.url,
        expiration_time: formData.expiration_time,
        role: formData.role.value,
      });
      refreshList();
      dispatch(closeModalDialog());
    } catch (error) {
      dispatch(showErrorResponse(error, translate('Unable to add user.')));
    }
  };

  return (
    <form onSubmit={handleSubmit(saveUser)}>
      <ModalHeader>
        <ModalTitle>{translate('Add user')}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <FormContainer submitting={submitting}>
          <AsyncSelectField
            name="user"
            label={translate('User')}
            placeholder={translate('Select user...')}
            loadOptions={(query, prevOptions, page) =>
              usersAutocomplete({ full_name: query }, prevOptions, page)
            }
            {...reactSelectMenuPortaling()}
            getOptionValue={(option) => option.full_name || option.username}
            getOptionLabel={getOptionLabel}
            components={{ Option: UserListOptionInline }}
            required={true}
          />
          <SelectField
            name="role"
            label={translate('Role')}
            options={getRoles()}
            {...reactSelectMenuPortaling()}
            required={true}
          />
          <DateField
            name="expiration_time"
            label={translate('Role expires on')}
            minDate={DateTime.now().plus({ days: 1 }).toISO()}
            weekStartsOn={1}
            {...datePickerOverlayContainerInDialogs()}
          />
        </FormContainer>
      </ModalBody>
      <ModalFooter>
        <SubmitButton block={false} submitting={submitting}>
          {translate('Add')}
        </SubmitButton>
        <CloseDialogButton />
      </ModalFooter>
    </form>
  );
});
