import { FunctionComponent, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { translate } from '@cloudrock/i18n';
import { ActionDialog } from '@cloudrock/modal/ActionDialog';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { Resource } from '@cloudrock/resource/types';
import { showErrorResponse, showSuccess } from '@cloudrock/store/notify';
import { deleteEntity } from '@cloudrock/table/actions';

import { deleteCatalog } from '../api';

interface OwnProps {
  resolve: {
    catalog: Resource;
  };
}

const useCatalogDeleteDialog = (catalog) => {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const callback = useCallback(async () => {
    try {
      setSubmitting(true);
      await deleteCatalog(catalog.uuid);
    } catch (error) {
      dispatch(
        showErrorResponse(error, translate('Unable to delete catalog.')),
      );
      setSubmitting(false);
      return;
    }
    dispatch(deleteEntity('rancher-catalogs', catalog.uuid));
    dispatch(showSuccess(translate('Catalog has been deleted.')));
    dispatch(closeModalDialog());
  }, [dispatch, catalog.uuid]);
  return {
    submitting,
    deleteCatalog: callback,
  };
};

export const CatalogDeleteDialog: FunctionComponent<OwnProps> = (props) => {
  const { submitting, deleteCatalog } = useCatalogDeleteDialog(
    props.resolve.catalog,
  );
  return (
    <ActionDialog
      title={translate('Delete catalog')}
      submitLabel={translate('Submit')}
      onSubmit={deleteCatalog}
      submitting={submitting}
    >
      {translate(
        'Are you sure you would like to delete Rancher catalog {catalog}?',
        { catalog: props.resolve.catalog.name },
      )}
    </ActionDialog>
  );
};
