import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { ReferralsList } from '@cloudrock/marketplace/referral/ReferralsList';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';

import { Offering } from '../types';

interface OfferingReferralsDialogProps {
  resolve: Offering;
}

export const OfferingReferralsDialog: FunctionComponent<OfferingReferralsDialogProps> =
  (props) => (
    <ModalDialog
      title={translate('Referrals for {name}', {
        name: props.resolve.name,
      })}
      footer={<CloseDialogButton />}
    >
      <ReferralsList offering={props.resolve} />
    </ModalDialog>
  );
