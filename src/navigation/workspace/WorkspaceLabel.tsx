import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { translate } from '@cloudrock/i18n';
import { getWorkspace } from '@cloudrock/workspace/selectors';
import {
  ORGANIZATION_WORKSPACE,
  PROJECT_WORKSPACE,
  SUPPORT_WORKSPACE,
  USER_WORKSPACE,
  WorkspaceType,
} from '@cloudrock/workspace/types';

import './WorkspaceLabel.scss';

const getWorkspaceAlias = (workspace: WorkspaceType): string => {
  let alias;
  switch (workspace) {
    case PROJECT_WORKSPACE: {
      alias = translate('Project workspace');
      break;
    }
    case ORGANIZATION_WORKSPACE: {
      alias = translate('Organization workspace');
      break;
    }
    case SUPPORT_WORKSPACE: {
      alias = translate('Support workspace');
      break;
    }
    case USER_WORKSPACE: {
      alias = translate('Personal workspace');
      break;
    }
    default: {
      alias = null;
    }
  }
  return alias;
};

export const WorkspaceLabel: FunctionComponent = () => {
  const workspace = useSelector(getWorkspace);
  return (
    <div className="workspace-label-container hidden-md-stable">
      <>{getWorkspaceAlias(workspace)}</>
    </div>
  );
};
