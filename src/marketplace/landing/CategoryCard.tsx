import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { OfferingLogo } from '@cloudrock/marketplace/common/OfferingLogo';
import { CategoryLink } from '@cloudrock/marketplace/links/CategoryLink';
import { Category } from '@cloudrock/marketplace/types';
import './CategoryCard.scss';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: FunctionComponent<CategoryCardProps> = (props) => (
  <div className="category-card">
    <CategoryLink
      className="category-thumb"
      category_uuid={props.category.uuid}
    >
      <OfferingLogo src={props.category.icon} />
    </CategoryLink>
    <div className="category-card-body">
      <h3 className="category-title">
        <CategoryLink category_uuid={props.category.uuid}>
          {props.category.title}
        </CategoryLink>
      </h3>
      {props.category.offering_count}{' '}
      {props.category.offering_count === 1
        ? translate('offering')
        : translate('offerings')}
    </div>
  </div>
);
