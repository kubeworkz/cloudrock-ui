import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { OfferingButton } from '@cloudrock/marketplace/common/OfferingButton';

import { OrderItemRequest } from './types';

interface ShoppingCartButtonProps {
  item: OrderItemRequest;
  onBtnClick(): void;
  flavor?: 'primary' | 'secondary' | 'ternary';
  disabled?: boolean;
  title?: string;
  icon?: string;
  isAddingItem?: boolean;
}

export const ShoppingCartButton: FunctionComponent<ShoppingCartButtonProps> = (
  props,
) => (
  <OfferingButton
    icon={props.icon || 'fa fa-shopping-cart'}
    isActive={true}
    title={props.title || translate('Add to cart')}
    onClick={() => props.onBtnClick()}
    flavor={props.flavor}
    disabled={props.disabled}
    isAddingItem={props.isAddingItem}
  />
);
