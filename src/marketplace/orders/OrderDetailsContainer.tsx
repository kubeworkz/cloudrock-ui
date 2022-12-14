import { connect } from 'react-redux';
import { compose } from 'redux';

import { withTranslation } from '@cloudrock/i18n';
import { RootState } from '@cloudrock/store/reducers';

import { OrderDetails } from './OrderDetails';
import * as actions from './store/actions';
import * as selectors from './store/selectors';

const mapStateToProps = (state: RootState) => ({
  stateChangeStatus: selectors.getStateChangeStatus(state),
  orderCanBeApproved: selectors.orderCanBeApproved(state),
});

const mapDispatchToProps = {
  approveOrder: actions.approveOrder,
  rejectOrder: actions.rejectOrder,
};

const enhance = compose(
  withTranslation,
  connect(mapStateToProps, mapDispatchToProps),
);

export const OrderDetailsContainer = enhance(OrderDetails);
