import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { OfferingButton } from '@cloudrock/marketplace/common/OfferingButton';

interface ShoppingCartUpdateButtonProps {
  updateItem(): void;
  flavor?: 'primary' | 'secondary' | 'ternary';
  disabled?: boolean;
  title?: string;
  icon?: string;
}

export const ShoppingCartUpdateButton: FunctionComponent<ShoppingCartUpdateButtonProps> =
  (props) => (
    <OfferingButton
      icon="fa fa-refresh"
      isActive={true}
      title={translate('Update')}
      onClick={() => props.updateItem()}
      flavor={props.flavor}
      disabled={props.disabled}
    />
  );
