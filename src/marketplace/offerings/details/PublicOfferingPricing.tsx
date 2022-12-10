import { FunctionComponent } from 'react';

import { OFFERING_TYPE_BOOKING } from '@cloudrock/booking/constants';
import { translate } from '@cloudrock/i18n';
import { PublicOfferingPricingPlansContainer } from '@cloudrock/marketplace/offerings/details/PublicOfferingPricingPlansContainer';
import { OfferingPurchaseButton } from '@cloudrock/marketplace/offerings/service-providers/shared/OfferingPurchaseButton';
import { Offering } from '@cloudrock/marketplace/types';
import './PublicOfferingPricing.scss';

interface PublicOfferingPricingProps {
  offering: Offering;
}

export const PublicOfferingPricing: FunctionComponent<PublicOfferingPricingProps> =
  ({ offering }) => (
    <div className="publicOfferingPricing">
      <PublicOfferingPricingPlansContainer offering={offering} />
      <div className="publicOfferingPricing__info">
        <span className="publicOfferingPricing__info__description">
          Please, select the plan that defines terms and conditions of
          accounting. Plans can differ in prices, quantities of components as
          well as configurations.
        </span>
        <OfferingPurchaseButton
          offering={offering}
          label={
            offering.type === OFFERING_TYPE_BOOKING
              ? translate('Book')
              : translate('Purchase')
          }
        />
      </div>
    </div>
  );
