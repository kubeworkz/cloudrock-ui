import { FunctionComponent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAsyncFn } from 'react-use';
import { getFormValues } from 'redux-form';

import { translate } from '@cloudrock/i18n';
import { getNumberOfNotificationReceivers } from '@cloudrock/issues/notifications/api';
import { NOTIFICATION_CREATE_FORM_ID } from '@cloudrock/issues/notifications/constants';

interface NumberIndicatorProps {
  shouldFetch;
}

export const NumberIndicator: FunctionComponent<NumberIndicatorProps> = ({
  shouldFetch,
}) => {
  const [{ value }, getNumber] = useAsyncFn(
    (data) => getNumberOfNotificationReceivers(data),
    [],
  );

  const formValues = useSelector((state) =>
    getFormValues(NOTIFICATION_CREATE_FORM_ID)(state),
  );

  useEffect(() => {
    const query = {};
    for (const [key, value] of Object.entries(formValues || {}) as any) {
      query[key] =
        value && typeof value === 'object'
          ? value.reduce((accumulator, currentValue) => {
              return [...accumulator, currentValue.uuid || currentValue.value];
            }, [])
          : undefined;
    }
    getNumber({ query });
  }, [shouldFetch, getNumber, formValues]);

  return (
    <p className="m-t-md">
      <b>
        {translate(
          'The number of recipients who will receive the notification:',
        )}
      </b>{' '}
      {value?.data}
    </p>
  );
};
