import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { reduxForm } from 'redux-form';

import { MonacoField } from '@cloudrock/form/MonacoField';
import { translate } from '@cloudrock/i18n';
import { ActionDialog } from '@cloudrock/modal/ActionDialog';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { showSuccess, showErrorResponse } from '@cloudrock/store/notify';

import { importYAML } from '../api';

export const ImportYAMLDialog = reduxForm<
  { yaml: string },
  { resolve: { cluster_id } }
>({ form: 'ImportYAMLDialog' })(({ resolve, handleSubmit, submitting }) => {
  const dispatch = useDispatch();

  const handler = useCallback(
    async (formData) => {
      try {
        await importYAML(resolve.cluster_id, formData.yaml);
        dispatch(showSuccess(translate('YAML has been imported.')));
        dispatch(closeModalDialog());
      } catch (e) {
        dispatch(showErrorResponse(e, translate('Unable to import YAML.')));
      }
    },
    [dispatch, resolve.cluster_id],
  );

  return (
    <ActionDialog
      title={translate('Import YAML')}
      submitLabel={translate('Submit')}
      onSubmit={handleSubmit(handler)}
      submitting={submitting}
    >
      <MonacoField name="yaml" mode="yaml" height={200} />
    </ActionDialog>
  );
});
