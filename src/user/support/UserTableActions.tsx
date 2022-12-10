import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { ENV } from '@cloudrock/configs/default';
import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { openModalDialog } from '@cloudrock/modal/actions';

const AddRemoteUserDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "AddRemoteUserDialog" */ './AddRemoteUserDialog'
    ),
  'AddRemoteUserDialog',
);

export const UserTableActions = ({ refreshList }) => {
  const dispatch = useDispatch();
  if (!ENV.plugins.CLOUDROCK_AUTH_SOCIAL.REMOTE_EDUTEAMS_ENABLED) {
    return null;
  }
  const openDialog = () => {
    dispatch(
      openModalDialog(AddRemoteUserDialog, { resolve: { refreshList } }),
    );
  };
  return (
    <Button onClick={openDialog} bsSize="small">
      <i className="fa fa-plus" />{' '}
      {translate('Add {provider} user', {
        provider: ENV.plugins.CLOUDROCK_AUTH_SOCIAL.EDUTEAMS_LABEL,
      })}
    </Button>
  );
};
