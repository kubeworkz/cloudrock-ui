import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { ReferralDetailsButton } from '@cloudrock/marketplace/referral/ReferralDetailsButton';
import { Offering } from '@cloudrock/marketplace/types';
import { Field } from '@cloudrock/resource/summary';

interface ReferralDetailsFieldProps {
  offering: Offering;
}

export const ReferralDetailsField: FunctionComponent<ReferralDetailsFieldProps> =
  (props) =>
    props.offering.citation_count >= 0 ? (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '10px', marginBottom: '-5px' }}>
          <Field
            label={translate('Referral count')}
            value={props.offering.citation_count}
          />
        </div>
        {props.offering.citation_count > 0 && (
          <ReferralDetailsButton offering={props.offering} />
        )}
      </div>
    ) : null;
