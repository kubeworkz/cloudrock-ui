import { FunctionComponent } from 'react';
import { connect } from 'react-redux';

import { translate } from '@cloudrock/i18n';
import { ActionButton } from '@cloudrock/table/ActionButton';

import { showPlanDetailsDialog } from './actions';

interface OwnProps {
  resource: string;
}

interface DispatchProps {
  showPlanDetailsDialog(): void;
}

type Props = OwnProps & DispatchProps;

const PurePlanDetailsButton: FunctionComponent<Props> = (props) => (
  <ActionButton
    title={translate('Plan details')}
    action={props.showPlanDetailsDialog}
  />
);

const mapDispatchToProps = (dispatch, ownProps: OwnProps) => ({
  showPlanDetailsDialog: () =>
    dispatch(showPlanDetailsDialog(ownProps.resource)),
});

export const PlanDetailsButton = connect(
  null,
  mapDispatchToProps,
)(PurePlanDetailsButton);
