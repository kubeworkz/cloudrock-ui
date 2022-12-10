import { translate } from '@cloudrock/i18n';
import { DialogActionButton } from '@cloudrock/resource/actions/DialogActionButton';

import { ReviewDialog } from './ReviewDialog';

export const ReviewRejectAction = ({ request, refreshList, apiMethod }) =>
  request.state === 'pending' ? (
    <DialogActionButton
      title={translate('Reject')}
      icon="fa fa-ban text-danger"
      resource={request}
      modalComponent={ReviewDialog}
      extraResolve={{
        refreshList,
        apiMethod,
      }}
    />
  ) : null;
