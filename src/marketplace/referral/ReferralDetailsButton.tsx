import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { Offering } from '@cloudrock/marketplace/types';
import { openModalDialog } from '@cloudrock/modal/actions';
import { ActionButton } from '@cloudrock/table/ActionButton';

const OfferingReferralsDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "OfferingReferralsDialog" */ './OfferingReferralsDialog'
    ),
  'OfferingReferralsDialog',
);

interface ReferralDetailsButtonProps {
  offering: Offering;
}

const openReferralsDialog = (offering: Offering) => {
  return openModalDialog(OfferingReferralsDialog, {
    resolve: offering,
    size: 'lg',
  });
};

export const ReferralDetailsButton: FunctionComponent<ReferralDetailsButtonProps> =
  (props) => {
    const dispatch = useDispatch();
    return (
      <ActionButton
        title={translate('Details')}
        icon="fa fa-eye"
        action={() => dispatch(openReferralsDialog(props.offering))}
      />
    );
  };
