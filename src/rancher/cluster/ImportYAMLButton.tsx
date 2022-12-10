import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { openModalDialog } from '@cloudrock/modal/actions';
import { ActionButton } from '@cloudrock/table/ActionButton';

const ImportYAMLDialog = lazyComponent(
  () => import(/* webpackChunkName: "ImportYAMLDialog" */ './ImportYAMLDialog'),
  'ImportYAMLDialog',
);

export const ImportYAMLButton: FunctionComponent<{ cluster_id }> = ({
  cluster_id,
}) => {
  const dispatch = useDispatch();
  return (
    <ActionButton
      title={translate('Import YAML')}
      action={() =>
        dispatch(
          openModalDialog(ImportYAMLDialog, {
            resolve: { cluster_id },
            size: 'lg',
          }),
        )
      }
      icon="fa fa-plus"
    />
  );
};
