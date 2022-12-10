import { FunctionComponent } from 'react';

import { PublicOfferingAttributes } from '@cloudrock/marketplace/offerings/details/PublicOfferingAttributes';
import { PublicOfferingDescriptionContainer } from '@cloudrock/marketplace/offerings/details/PublicOfferingDescriptionContainer';
import { Category, Offering } from '@cloudrock/marketplace/types';
import './PublicOfferingInfo.scss';

interface PublicOfferingInfoProps {
  offering: Offering;
  category: Category;
}

export const PublicOfferingInfo: FunctionComponent<PublicOfferingInfoProps> = ({
  offering,
  category,
}) => (
  <div className="publicOfferingInfo">
    <PublicOfferingDescriptionContainer
      offering={offering}
      category={category}
    />
    <PublicOfferingAttributes offering={offering} category={category} />
  </div>
);
