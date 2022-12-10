import { FunctionComponent } from 'react';

import { Link } from '@cloudrock/core/Link';
import { translate } from '@cloudrock/i18n';
import './ShowOfferingsButton.scss';
import { Offering } from '@cloudrock/marketplace/types';

interface OfferingDetailsButtonProps {
  offering: Offering;
}

export const OfferingDetailsButton: FunctionComponent<OfferingDetailsButtonProps> =
  ({ offering }) => (
    <div className="offeringDetailsButton m-b">
      <Link
        state="marketplace-public-offering.details"
        params={{ uuid: offering.uuid }}
      >
        <button type="button" className="btn btn-default btn-card">
          {translate('Details')}
        </button>
      </Link>
    </div>
  );
