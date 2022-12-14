import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { isUpdatingItem } from '@cloudrock/marketplace/cart/store/selectors';
import { RootState } from '@cloudrock/store/reducers';

import { OrderItemResponse } from '../orders/types';

import { ShoppingCartUpdateButton } from './ShoppingCartUpdateButton';
import { updateItemRequest } from './store/actions';

interface OwnProps {
  item: OrderItemResponse;
  flavor?: string;
  disabled?: boolean;
}

interface DispatchProps {
  updateItem(): void;
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
  disabled: ownProps.disabled || isUpdatingItem(state),
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => ({
  updateItem: () => dispatch(updateItemRequest(ownProps.item)),
});

const enhance = connect<{}, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
);

export const ShoppingCartUpdateButtonContainer = enhance(
  ShoppingCartUpdateButton,
);
