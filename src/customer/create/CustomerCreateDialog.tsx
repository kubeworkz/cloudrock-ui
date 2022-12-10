import { useRouter } from '@uirouter/react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reset, SubmissionError } from 'redux-form';

import { ENV } from '@cloudrock/configs/default';
import { sendForm } from '@cloudrock/core/api';
import { CUSTOMER_OWNER_ROLE } from '@cloudrock/core/constants';
import { translate } from '@cloudrock/i18n';
import { showSuccess, showErrorResponse } from '@cloudrock/store/notify';
import { getCurrentUser } from '@cloudrock/user/UsersService';
import { setCurrentUser } from '@cloudrock/workspace/actions';
import { getUser } from '@cloudrock/workspace/selectors';
import { Customer } from '@cloudrock/workspace/types';

import { CustomerPermissionsService } from '../services/CustomerPermissionsService';

import * as constants from './constants';
import { CustomerCreateForm } from './CustomerCreateForm';

const CUSTOMER_FIELDS = [
  'name',
  'native_name',
  'domain',
  'email',
  'phone_number',
  'registration_code',
  'country',
  'address',
  'vat_code',
  'postal',
  'bank_name',
  'bank_account',
  'image',
];

interface OwnProps {
  resolve: { role: string };
}

export const CustomerCreateDialog: React.FC<OwnProps> = ({ resolve }) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const router = useRouter();

  const createOrganization = React.useCallback(
    async (formData) => {
      const payload: Record<string, string | boolean> = {};
      CUSTOMER_FIELDS.forEach((field) => {
        if (formData[field]) {
          payload[field] = formData[field];
        }
      });
      if (formData.vat_code) {
        payload.is_company = true;
      }
      if (formData.country) {
        payload.country = formData.country.value;
      }

      try {
        const response = await sendForm<Customer>(
          'POST',
          `${ENV.apiEndpoint}api/customers/`,
          payload,
        );
        const customer = response.data;
        if (resolve.role === constants.ROLES.provider) {
          await CustomerPermissionsService.create({
            role: CUSTOMER_OWNER_ROLE,
            customer: customer.url,
            user: user.url,
            enable_notifications: false,
          });
        }
        dispatch(showSuccess(translate('Organization has been created.')));
        const newUser = await getCurrentUser();
        dispatch(setCurrentUser(newUser));
        router.stateService.go('organization.dashboard', {
          uuid: customer.uuid,
        });
        dispatch(reset('CustomerCreateDialog'));
      } catch (e) {
        dispatch(
          showErrorResponse(e, translate('Could not create organization')),
        );
        if (e.status === 400) {
          throw new SubmissionError(e.data);
        }
      }
    },
    [dispatch, router, user, resolve.role],
  );
  return <CustomerCreateForm onSubmit={createOrganization} />;
};
