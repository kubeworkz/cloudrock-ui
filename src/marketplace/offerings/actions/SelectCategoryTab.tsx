import { useAsync } from 'react-use';
import { Field } from 'redux-form';

import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { ChoicesTable } from '@cloudrock/form/ChoicesTable';
import { translate } from '@cloudrock/i18n';
import { getCategories } from '@cloudrock/marketplace/common/api';

export const SelectCategoryTab = () => {
  const {
    loading,
    error,
    value: categories,
  } = useAsync(() => getCategories(), []);
  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <>{translate('Unable to load categories')}</>;
  }
  if (categories.length === 0) {
    return <>{translate('There are no categories yet.')}</>;
  }
  return (
    <Field
      name="category"
      component={(fieldProps) => (
        <ChoicesTable
          columns={[
            {
              name: 'title',
              label: translate('Name'),
            },
          ]}
          choices={categories as any}
          input={fieldProps.input}
        />
      )}
    />
  );
};
