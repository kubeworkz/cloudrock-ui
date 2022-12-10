import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { OfferingButton } from '@cloudrock/marketplace/common/OfferingButton';
import { Offering } from '@cloudrock/marketplace/types';

interface OfferingCompareButtonProps {
  offering: Offering;
  isCompared: boolean;
  addItem(): void;
  removeItem(): void;
  flavor?: 'primary' | 'secondary' | 'ternary';
}

export const OfferingCompareButton: FunctionComponent<OfferingCompareButtonProps> =
  (props) => (
    <OfferingButton
      icon="fa fa-balance-scale"
      isActive={props.isCompared}
      title={
        props.isCompared
          ? translate('Remove from comparison')
          : translate('Add to comparison')
      }
      onClick={() => (props.isCompared ? props.removeItem() : props.addItem())}
      flavor={props.flavor}
    />
  );
