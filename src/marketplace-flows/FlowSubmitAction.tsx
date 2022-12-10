import { translate } from '@cloudrock/i18n';
import { AsyncActionButton } from '@cloudrock/resource/actions/AsyncActionButton';

import { submitFlow } from './api';

export const FlowSubmitAction = ({ flow, refreshList }) =>
  flow.state === 'draft' ? (
    <AsyncActionButton
      title={translate('Submit')}
      icon="fa fa-check"
      resource={flow}
      refreshList={refreshList}
      apiMethod={submitFlow}
    />
  ) : null;
