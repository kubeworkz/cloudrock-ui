import { useDispatch } from 'react-redux';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { openModalDialog } from '@cloudrock/modal/actions';
import { ActionButton } from '@cloudrock/table/ActionButton';

const ViewYAMLDialog = lazyComponent(
  () => import(/* webpackChunkName: "ViewYAMLDialog" */ './ViewYAMLDialog'),
  'ViewYAMLDialog',
);

export const ViewYAMLButton = ({
  resource,
  disabled,
}: {
  resource: any;
  disabled?: boolean;
}) => {
  const dispatch = useDispatch();
  return (
    <ActionButton
      title={translate('View YAML')}
      action={() =>
        dispatch(
          openModalDialog(ViewYAMLDialog, {
            resolve: { resource },
            size: 'lg',
          }),
        )
      }
      icon="fa fa-edit"
      disabled={disabled}
    />
  );
};
