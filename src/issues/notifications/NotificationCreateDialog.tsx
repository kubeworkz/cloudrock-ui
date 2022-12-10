import { useCallback, useState } from 'react';
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { reduxForm } from 'redux-form';

import { SubmitButton } from '@cloudrock/auth/SubmitButton';
import { post } from '@cloudrock/core/api';
import { required } from '@cloudrock/core/validators';
import { FormContainer, StringField, TextField } from '@cloudrock/form';
import { AsyncSelectField } from '@cloudrock/form/AsyncSelectField';
import { reactSelectMenuPortaling } from '@cloudrock/form/utils';
import { translate } from '@cloudrock/i18n';
import { NOTIFICATION_CREATE_FORM_ID } from '@cloudrock/issues/notifications/constants';
import { NumberIndicator } from '@cloudrock/issues/notifications/NumberIndicator';
import {
  offeringsAutocomplete,
  organizationAutocomplete,
} from '@cloudrock/marketplace/common/autocompletes';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { showErrorResponse, showSuccess } from '@cloudrock/store/notify';

export const NotificationCreateDialog = reduxForm({
  form: NOTIFICATION_CREATE_FORM_ID,
})(({ submitting, invalid, handleSubmit }) => {
  const [fetchNumber, setFetchNumber] = useState<any>();
  const dispatch = useDispatch();

  const createNotification = useCallback(
    async (formData) => {
      try {
        const response = await post<{ emails: string[] }>(
          '/broadcast_messages/',
          {
            subject: formData.subject,
            body: formData.body,
            query: {
              customers: formData.customers?.map((c) => c.uuid),
              offerings: formData.offerings?.map((c) => c.uuid),
            },
          },
        );
        dispatch(
          showSuccess(
            translate('Notifications has been sent to {count} users.', {
              count: response.data.emails.length,
            }),
          ),
        );
        dispatch(closeModalDialog());
      } catch (e) {
        dispatch(
          showErrorResponse(e, translate('Unable to create notifications.')),
        );
      }
    },
    [dispatch],
  );

  return (
    <form
      onSubmit={handleSubmit(createNotification)}
      onChange={(e) => setFetchNumber(e)}
    >
      <ModalHeader>
        <ModalTitle>{translate('Create a broadcast')}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <FormContainer submitting={submitting}>
          <StringField
            name="subject"
            label={translate('Subject')}
            required={true}
            validate={required}
          />
          <TextField
            name="body"
            label={translate('Message')}
            required={true}
            validate={required}
          />
          <AsyncSelectField
            name="offerings"
            label={translate('Offerings')}
            placeholder={translate('Select offerings...')}
            loadOptions={(query, prevOptions, page) =>
              offeringsAutocomplete(
                { name: query, shared: true },
                prevOptions,
                page,
              )
            }
            isMulti={true}
            {...reactSelectMenuPortaling()}
            onChange={(e) => setFetchNumber(e)}
          />
          <AsyncSelectField
            name="customers"
            label={translate('Organizations')}
            placeholder={translate('Select organizations...')}
            loadOptions={(query, prevOptions, page) =>
              organizationAutocomplete(query, prevOptions, page, {
                field: ['name', 'uuid'],
                o: 'name',
              })
            }
            isMulti={true}
            {...reactSelectMenuPortaling()}
            onChange={(e) => setFetchNumber(e)}
          />
        </FormContainer>
        <NumberIndicator shouldFetch={fetchNumber} />
      </ModalBody>
      <ModalFooter>
        <SubmitButton
          block={false}
          label={translate('Create')}
          submitting={submitting}
          invalid={invalid}
        />
        <CloseDialogButton />
      </ModalFooter>
    </form>
  );
});
