import { connect } from 'react-redux';

import { NavbarIndicator } from '@cloudrock/navigation/header/NavbarIndicator';
import { RootState } from '@cloudrock/store/reducers';
import { getWorkspace } from '@cloudrock/workspace/selectors';
import {
  WorkspaceType,
  PROJECT_WORKSPACE,
  ORGANIZATION_WORKSPACE,
} from '@cloudrock/workspace/types';

import { getCount } from './store/selectors';

interface ComparisonIndicatorProps {
  count: number;
  workspace: WorkspaceType;
}

const PureComparisonIndicator = (props: ComparisonIndicatorProps) =>
  [ORGANIZATION_WORKSPACE, PROJECT_WORKSPACE].indexOf(props.workspace) !==
  -1 ? (
    <NavbarIndicator
      state={
        props.workspace === ORGANIZATION_WORKSPACE
          ? 'marketplace-compare-customer'
          : 'marketplace-compare'
      }
      iconClass="fa fa-balance-scale"
      count={props.count}
    />
  ) : null;

const mapStateToProps = (state: RootState) => ({
  count: getCount(state),
  workspace: getWorkspace(state),
});

export const ComparisonIndicator = connect(mapStateToProps)(
  PureComparisonIndicator,
);
