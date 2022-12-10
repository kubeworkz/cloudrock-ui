import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { post } from '@cloudrock/core/api';
import { format } from '@cloudrock/core/ErrorMessageFormatter';
import { translate } from '@cloudrock/i18n';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { showError, showSuccess } from '@cloudrock/store/notify';
import { setCurrentUser } from '@cloudrock/workspace/actions';

export const useEmailChange = (user) => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = useCallback(async () => {
    setSubmitting(false);
    try {
      await post(`/users/${user.uuid}/change_email/`, { email });
    } catch (error) {
      const errorMessage = `${translate('Unable to change email.')} ${format(
        error,
      )}`;
      dispatch(showError(errorMessage));
      return;
    }
    dispatch(
      showSuccess(
        translate('Email verification has been sent. Please check your inbox.'),
      ),
    );
    dispatch(closeModalDialog());
    dispatch(setCurrentUser({ ...user, requested_email: email }));
  }, [user, email, dispatch]);

  return { handleSubmit, submitting, email, setEmail };
};
