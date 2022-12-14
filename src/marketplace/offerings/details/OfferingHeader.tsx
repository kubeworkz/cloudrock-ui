import React from 'react';
import { Col } from 'react-bootstrap';

import { AuthService } from '@cloudrock/auth/AuthService';
import { OFFERING_TYPE_BOOKING } from '@cloudrock/booking/constants';
import { formatDateTime } from '@cloudrock/core/dateUtils';
import { Tooltip } from '@cloudrock/core/Tooltip';
import { translate } from '@cloudrock/i18n';
import { getLabel } from '@cloudrock/marketplace/common/registry';
import { GoogleCalendarLinkField } from '@cloudrock/marketplace/offerings/details/GoogleCalendarLinkField';
import { ReferralDetailsField } from '@cloudrock/marketplace/referral/ReferralDetailsField';
import { Offering } from '@cloudrock/marketplace/types';
import { Field } from '@cloudrock/resource/summary';
import { ResourceDetailsTable } from '@cloudrock/resource/summary/ResourceDetailsTable';
import { BooleanField } from '@cloudrock/table/BooleanField';

interface OfferingHeaderProps {
  offering: Offering;
  hideName?: boolean;
}

export const OfferingHeader: React.FC<OfferingHeaderProps> = (props) => (
  <Col sm={12}>
    <ResourceDetailsTable>
      {!props.hideName && (
        <Field label={translate('Name')} value={props.offering.name} />
      )}

      <Field label={translate('Type')} value={getLabel(props.offering.type)} />

      <Field
        label={translate('Category')}
        value={props.offering.category_title}
      />

      <Field label={translate('State')} value={props.offering.state} />

      <Field
        label={translate('Shared')}
        value={
          <Tooltip
            id="shared-flag"
            label={translate('Accessible to all customers.')}
          >
            <BooleanField value={props.offering.shared} />
          </Tooltip>
        }
      />

      <Field
        label={translate('Billing enabled')}
        value={
          <Tooltip
            id="billing-flag"
            label={translate('Purchase and usage is invoiced.')}
          >
            <BooleanField value={props.offering.billable} />
          </Tooltip>
        }
      />

      <Field
        label={translate('Created')}
        value={formatDateTime(props.offering.created)}
      />

      <Field
        label={translate('Datacite DOI')}
        value={props.offering.datacite_doi}
      />

      <ReferralDetailsField offering={props.offering} />
    </ResourceDetailsTable>
    {AuthService.isAuthenticated() &&
      props.offering.type === OFFERING_TYPE_BOOKING && (
        <GoogleCalendarLinkField offering={props.offering} />
      )}
  </Col>
);
