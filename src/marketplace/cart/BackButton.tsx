import { useRouter } from '@uirouter/react';
import React from 'react';
import { useSelector } from 'react-redux';

import { translate } from '@cloudrock/i18n';
import { ActionButton } from '@cloudrock/table/ActionButton';
import { getWorkspace } from '@cloudrock/workspace/selectors';

import { WORKSPACE_LANDING } from '../constants';

export const BackButton: React.FC = () => {
  const workspace = useSelector(getWorkspace);
  const router = useRouter();

  const goBack = () => {
    router.stateService.go(WORKSPACE_LANDING[workspace]);
  };

  return (
    <ActionButton
      title={translate('Back to shopping')}
      icon="fa fa-arrow-left"
      className="btn btn-outline btn-default"
      action={goBack}
    />
  );
};
