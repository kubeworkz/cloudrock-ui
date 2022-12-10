import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useAsync } from 'react-use';
import { Field } from 'redux-form';

import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { ChoicesTable } from '@cloudrock/form/ChoicesTable';
import { translate } from '@cloudrock/i18n';
import { getLabel } from '@cloudrock/marketplace/common/registry';

import { loadRemoteOfferings } from './api';
import { importOfferingSelector } from './selectors';

export const SelectOfferingTab = () => {
  const formData = useSelector(importOfferingSelector);
  const {
    loading,
    error,
    value: offerings,
  } = useAsync(() => {
    if (!formData?.api_url || !formData?.token || !formData?.customer?.uuid) {
      return Promise.reject(
        new Error(translate('Please check the credentials again.')),
      );
    }
    return loadRemoteOfferings(
      formData.api_url,
      formData.token,
      formData.customer?.uuid,
    ).then((offerings) =>
      offerings.map((offering) => ({
        ...offering,
        type_label: getLabel(offering.type),
      })),
    );
  }, []);
  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return (
      <Alert bsStyle="danger">
        <h4>{translate('Unable to load offerings')}</h4>
        {error?.message && <p>{error.message}</p>}
      </Alert>
    );
  }
  if (offerings.length === 0) {
    return <>{translate('There are no offerings yet.')}</>;
  }
  return (
    <Field
      name="offering"
      component={(fieldProps) => (
        <ChoicesTable
          columns={[
            {
              name: 'name',
              label: translate('Name'),
            },
            {
              name: 'type_label',
              label: translate('Type'),
            },
            {
              name: 'state',
              label: translate('State'),
            },
            {
              name: 'category_title',
              label: translate('Remote category'),
            },
          ]}
          choices={offerings as any}
          input={fieldProps.input}
        />
      )}
    />
  );
};
