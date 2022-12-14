import React from 'react';
import { useSelector } from 'react-redux';

import { Link } from '@cloudrock/core/Link';
import { RootState } from '@cloudrock/store/reducers';
import { getWorkspace } from '@cloudrock/workspace/selectors';
import { ORGANIZATION_WORKSPACE } from '@cloudrock/workspace/types';

interface OwnProps {
  order_item_uuid: string;
  className?: string;
}

const stateSelector = (state: RootState) => {
  const workspace = getWorkspace(state);
  if (workspace === ORGANIZATION_WORKSPACE) {
    return 'marketplace-shopping-cart-item-update-customer';
  } else {
    return 'marketplace-shopping-cart-item-update';
  }
};

export const ShoppingCartItemUpdateLink: React.FC<OwnProps> = (props) => {
  const state = useSelector(stateSelector);
  return (
    <Link
      state={state}
      params={{ order_item_uuid: props.order_item_uuid }}
      className={props.className}
    >
      {props.children}
    </Link>
  );
};
