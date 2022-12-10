import classNames from 'classnames';
import { FunctionComponent } from 'react';

import { FormattedHtml } from '@cloudrock/core/FormattedHtml';
import { OfferingLogo } from '@cloudrock/marketplace/common/OfferingLogo';
import { OfferingLink } from '@cloudrock/marketplace/links/OfferingLink';
import { wrapTooltip } from '@cloudrock/table/ActionButton';

import { Offering } from '../types';

interface MobileOfferingCardProps {
  offering: Offering;
}

export const MobileOfferingCard: FunctionComponent<MobileOfferingCardProps> = (
  props,
) => (
  <tr className={classNames({ disabled: props.offering.state !== 'Active' })}>
    <td className="img-md">
      {wrapTooltip(
        props.offering.state === 'Paused' && props.offering.paused_reason,
        <OfferingLink offering_uuid={props.offering.uuid}>
          <OfferingLogo src={props.offering.thumbnail} />
        </OfferingLink>,
      )}
    </td>
    <td>
      <h3>
        <OfferingLink offering_uuid={props.offering.uuid}>
          {props.offering.name}
        </OfferingLink>
      </h3>
      <FormattedHtml html={props.offering.description} />
    </td>
  </tr>
);
