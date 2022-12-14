import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { openModalDialog } from '@cloudrock/modal/actions';
import { ActionButton } from '@cloudrock/table/ActionButton';

import type { PlanUsageRowProps } from './types';

const PlanUsageDialog = lazyComponent(
  () => import(/* webpackChunkName: "PlanUsageDialog" */ './PlanUsageDialog'),
  'PlanUsageDialog',
);

interface DispatchProps {
  openDialog(): void;
}

type Props = DispatchProps & PlanUsageRowProps;

const PurePlanUsageButton: FunctionComponent<Props> = (props) => (
  <ActionButton
    title={translate('Show chart')}
    disabled={props.row.limit === null}
    tooltip={
      props.row.limit === null ? translate('Plan does not have limit') : ''
    }
    action={props.openDialog}
  />
);

const mapDispatchToProps = (dispatch, ownProps) => ({
  openDialog: () =>
    dispatch(
      openModalDialog(PlanUsageDialog, {
        resolve: { row: ownProps.row },
      }),
    ),
});

const connector = connect(null, mapDispatchToProps);

export const PlanUsageButton = connector(
  PurePlanUsageButton,
) as React.ComponentType<PlanUsageRowProps>;
