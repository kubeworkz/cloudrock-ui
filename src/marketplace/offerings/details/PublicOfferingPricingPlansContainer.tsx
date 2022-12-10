import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { ExportFullPriceList } from '@cloudrock/marketplace/offerings/details/ExportFullPriceList';
import { PublicOfferingPricingPlans } from '@cloudrock/marketplace/offerings/details/PublicOfferingPricingPlans';
import { Offering } from '@cloudrock/marketplace/types';
import './PublicOfferingPricingPlansContainer.scss';

interface PublicOfferingPricingPlansContainerProps {
  offering: Offering;
}

export const PublicOfferingPricingPlansContainer: FunctionComponent<PublicOfferingPricingPlansContainerProps> =
  ({ offering }) => (
    <div className="pricingPlansContainer">
      <div className="pricingPlansContainer__header m-b">
        <h1>{translate('Pricing & setup')}</h1>
        <ExportFullPriceList offering={offering} />
      </div>
      <PublicOfferingPricingPlans offering={offering} />
    </div>
  );
