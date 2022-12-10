import { FunctionComponent } from 'react';

import { OfferingLogo } from '@cloudrock/marketplace/common/OfferingLogo';
import { OfferingLink } from '@cloudrock/marketplace/links/OfferingLink';
import { ProviderLink } from '@cloudrock/marketplace/links/ProviderLink';

import { RatingStars } from '../common/RatingStars';
import { Offering } from '../types';

import './ComparisonItem.scss';
import { ComparisonItemRemoveButtonContainer } from './ComparisonItemRemoveButtonContainer';

interface ComparisonItemProps {
  item: Offering;
}

export const ComparisonItem: FunctionComponent<ComparisonItemProps> = (
  props,
) => (
  <div className="text-center comparison-item">
    <ComparisonItemRemoveButtonContainer offering={props.item} />
    <OfferingLink
      offering_uuid={props.item.uuid}
      className="comparison-item-thumb"
    >
      <OfferingLogo src={props.item.thumbnail} />
    </OfferingLink>
    <p style={{ fontSize: 16 }}>{props.item.name}</p>
    <p>
      by{' '}
      <ProviderLink customer_uuid={props.item.customer_uuid}>
        {props.item.customer_name}
      </ProviderLink>
    </p>
    {props.item.rating && (
      <RatingStars rating={props.item.rating} size="medium" />
    )}
    {props.item.reviews && (
      <p>
        Based on <a>{props.item.reviews} reviews</a>
      </p>
    )}
  </div>
);
