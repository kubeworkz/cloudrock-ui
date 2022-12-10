import { translate } from '@cloudrock/i18n';
import { AsyncActionButton } from '@cloudrock/resource/actions/AsyncActionButton';

import { cancelFlow } from './api';

export const FlowCancelAction = ({ flow, refreshList }) => (
  <AsyncActionButton
    title={translate('Cancel')}
    icon="fa fa-ban"
    resource={flow}
    refreshList={refreshList}
    apiMethod={cancelFlow}
  />
);
