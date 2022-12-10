import { FunctionComponent } from 'react';

import { OFFERING_TYPE_BOOKING } from '@cloudrock/booking/constants';
import { FormattedHtml } from '@cloudrock/core/FormattedHtml';
import { translate } from '@cloudrock/i18n';
import { Divisions } from '@cloudrock/marketplace/offerings/service-providers/shared/Divisions';
import { OfferingDetailsButton } from '@cloudrock/marketplace/offerings/service-providers/shared/OfferingDetailsButton';
import { OfferingLogo } from '@cloudrock/marketplace/offerings/service-providers/shared/OfferingLogo';
import { OfferingPurchaseButton } from '@cloudrock/marketplace/offerings/service-providers/shared/OfferingPurchaseButton';
import { Offering } from '@cloudrock/marketplace/types';
import './ServiceProviderOfferingDetailsCard.scss';

interface ServiceProviderOfferingDetailsCardProps {
  row: Offering;
}

export const ServiceProviderOfferingDetailsCard: FunctionComponent<ServiceProviderOfferingDetailsCardProps> =
  ({ row }) => (
    <div className="offeringCard">
      <OfferingLogo offering={row} />
      <div className="card-title m-t-sm">{row.name}</div>
      <div className="offeringCard__description m-t-xs">
        <FormattedHtml html={row.description} />
      </div>
      <div className="offeringCard__contentAlwaysOnBottom m-t">
        <Divisions divisions={row.divisions} />
        <OfferingDetailsButton offering={row} />
        <OfferingPurchaseButton
          offering={row}
          label={
            row.type === OFFERING_TYPE_BOOKING
              ? translate('Book')
              : translate('Purchase')
          }
        />
      </div>
    </div>
  );
