import { FunctionComponent } from 'react';

import { OFFERING_TYPE_BOOKING } from '@cloudrock/booking/constants';
import { translate } from '@cloudrock/i18n';
import { GoogleCalendarLink } from '@cloudrock/marketplace/offerings/details/GoogleCalendarLink';
import { shouldRenderAttributesSection } from '@cloudrock/marketplace/offerings/details/utils';
import { CopyToClipboard } from '@cloudrock/marketplace/offerings/service-providers/shared/CopyToClipboard';
import { ReferralDetailsButton } from '@cloudrock/marketplace/referral/ReferralDetailsButton';
import { Offering } from '@cloudrock/marketplace/types';
import './PublicOfferingAttributesSection.scss';

interface PublicOfferingAttributesSectionProps {
  offering: Offering;
}

export const PublicOfferingAttributesSection: FunctionComponent<PublicOfferingAttributesSectionProps> =
  ({ offering }) =>
    shouldRenderAttributesSection(offering) ? (
      <div className="bordered publicOfferingAttributesSection m-b-sm">
        {offering.datacite_doi && (
          <div>
            <b>{translate('Datacite DOI')}:</b>
            <span className="m-l-sm m-r">{offering.datacite_doi}</span>
            <CopyToClipboard value={offering.datacite_doi} />
          </div>
        )}
        {offering.citation_count >= 0 && (
          <div className="publicOfferingAttributesSection__referralCount">
            <div>
              <b>{translate('Referral count')}:</b>
              <span className="m-l-sm">{offering.citation_count}</span>
            </div>
            {offering.citation_count > 0 && (
              <ReferralDetailsButton offering={offering} />
            )}
          </div>
        )}
        {offering.google_calendar_link &&
          offering.type === OFFERING_TYPE_BOOKING && (
            <GoogleCalendarLink link={offering.google_calendar_link} />
          )}
      </div>
    ) : null;
