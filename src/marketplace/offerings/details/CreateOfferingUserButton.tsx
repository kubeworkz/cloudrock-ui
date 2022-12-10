import { useDispatch } from 'react-redux';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { openModalDialog } from '@cloudrock/modal/actions';
import { ActionButton } from '@cloudrock/table/ActionButton';

const CreateOfferingUserDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "CreateOfferingUserDialog" */ './CreateOfferingUserDialog'
    ),
  'CreateOfferingUserDialog',
);

export const CreateOfferingUserButton = ({ offering, onSuccess }) => {
  const dispatch = useDispatch();
  return (
    <ActionButton
      title={translate('Create')}
      icon="fa fa-plus"
      action={() =>
        dispatch(
          openModalDialog(CreateOfferingUserDialog, {
            resolve: { offering, onSuccess },
          }),
        )
      }
    />
  );
};
