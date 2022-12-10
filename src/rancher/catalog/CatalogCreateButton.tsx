import { useCallback, FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import { ENV } from '@cloudrock/configs/default';
import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { openModalDialog } from '@cloudrock/modal/actions';
import { ActionButton } from '@cloudrock/table/ActionButton';

const CatalogCreateDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "CatalogCreateDialog" */ './CatalogCreateDialog'
    ),
  'CatalogCreateDialog',
);

const createCatalogDialog = (cluster) =>
  openModalDialog(CatalogCreateDialog, { resolve: { cluster } });

export const CatalogCreateButton: FunctionComponent<any> = (props) => {
  const dispatch = useDispatch();
  const callback = useCallback(
    () => dispatch(createCatalogDialog(props.cluster)),
    [dispatch, props.cluster],
  );
  if (ENV.plugins.CLOUDROCK_RANCHER.READ_ONLY_MODE) {
    return null;
  }
  return (
    <ActionButton
      title={translate('Create')}
      action={callback}
      icon="fa fa-plus"
    />
  );
};
