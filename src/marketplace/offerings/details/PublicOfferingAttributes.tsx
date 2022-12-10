import { FunctionComponent } from 'react';

import { AttributesList } from '@cloudrock/marketplace/offerings/details/AttributesList';
import { PublicOfferingAttributesSection } from '@cloudrock/marketplace/offerings/details/PublicOfferingAttributesSection';
import {
  shouldRenderAttributesList,
  shouldRenderAttributesSection,
} from '@cloudrock/marketplace/offerings/details/utils';
import { Category, Offering } from '@cloudrock/marketplace/types';
import './PublicOfferingAttributes.scss';

interface PublicOfferingAttributesProps {
  offering: Offering;
  category: Category;
}

export const PublicOfferingAttributes: FunctionComponent<PublicOfferingAttributesProps> =
  ({ offering, category }) =>
    shouldRenderAttributesSection(offering) ||
    shouldRenderAttributesList(category.sections, offering.attributes) ? (
      <div className="publicOfferingAttributes bordered">
        <PublicOfferingAttributesSection offering={offering} />
        {shouldRenderAttributesList(category.sections, offering.attributes) && (
          <AttributesList
            attributes={offering.attributes}
            sections={category.sections}
          />
        )}
      </div>
    ) : null;
