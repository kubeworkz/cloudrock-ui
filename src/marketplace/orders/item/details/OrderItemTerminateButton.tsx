import { Component } from 'react';
import { connect } from 'react-redux';

import { format } from '@cloudrock/core/ErrorMessageFormatter';
import { translate } from '@cloudrock/i18n';
import { terminateOrderItem } from '@cloudrock/marketplace/common/api';
import { showSuccess, showError } from '@cloudrock/store/notify';
import { ActionButton } from '@cloudrock/table/ActionButton';

interface OrderItemTerminateButtonProps {
  uuid: string;
  loadData(): void;
  showSuccess(msg: string): void;
  showError(msg: string): void;
}

class PureOrderItemTerminateButton extends Component<OrderItemTerminateButtonProps> {
  state = {
    loading: false,
  };

  terminateOrderItem = async () => {
    this.setState({ loading: true });
    try {
      await terminateOrderItem(this.props.uuid);
      this.props.showSuccess(
        translate('Order item has cancel has been scheduled.'),
      );
      this.props.loadData();
    } catch (response) {
      this.props.showSuccess(
        `${translate('Unable to cancel order item.')} ${format(response)}`,
      );
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <ActionButton
        className="btn btn-sm btn-danger m-b-sm"
        title={translate('Cancel')}
        action={this.terminateOrderItem}
        disabled={this.state.loading}
        icon={this.state.loading ? 'fa fa-spinner fa-spin' : 'fa fa-trash'}
      />
    );
  }
}

export const OrderItemTerminateButton = connect(null, {
  showSuccess,
  showError,
})(PureOrderItemTerminateButton);
