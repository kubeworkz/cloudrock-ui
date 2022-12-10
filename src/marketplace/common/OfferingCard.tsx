import classNames from 'classnames';
import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { OfferingLogo } from '@cloudrock/marketplace/common/OfferingLogo';
import { OfferingCompareButtonContainer } from '@cloudrock/marketplace/compare/OfferingCompareButtonContainer';
import { OfferingLink } from '@cloudrock/marketplace/links/OfferingLink';
import { wrapTooltip } from '@cloudrock/table/ActionButton';

import { Offering } from '../types';

import './OfferingCard.scss';
import { ReviewButton } from './ReviewButton';

interface OfferingCardProps {
  offering: Offering;
}

export const OfferingCard: FunctionComponent<OfferingCardProps> = (props) =>
  wrapTooltip(
    props.offering.state === 'Paused' &&
      (props.offering.paused_reason ||
        translate('Requesting of new resources has been temporarily paused')),
    <div
      className={classNames('offering-card', {
        disabled: props.offering.state !== 'Active',
      })}
    >
      <OfferingLink
        offering_uuid={props.offering.uuid}
        className="offering-thumb"
      >
        <OfferingLogo src={props.offering.thumbnail} />
      </OfferingLink>
      <div className="offering-card-body">
        <h3 className="offering-title">
          <OfferingLink offering_uuid={props.offering.uuid}>
            {props.offering.name}
          </OfferingLink>
        </h3>
      </div>
      <div className="offering-button-group">
        <ReviewButton />
        <OfferingCompareButtonContainer offering={props.offering} />
      </div>
    </div>,
  );
