import { FunctionComponent } from 'react';
import { useAsync } from 'react-use';

import { getBookingOffering } from '@cloudrock/booking/api';
import { CopyToClipboardContainer } from '@cloudrock/core/CopyToClipboardContainer';
import { translate } from '@cloudrock/i18n';
import { Offering } from '@cloudrock/marketplace/types';
import { Field } from '@cloudrock/resource/summary';
import { ResourceDetailsTable } from '@cloudrock/resource/summary/ResourceDetailsTable';

import './GoogleCalendarLinkField.scss';

interface GoogleCalendarLinkFieldProps {
  offering: Offering;
}

const googleCalendarLink = (link: string) => {
  const value = link;
  const content = (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {value}
    </a>
  );
  return <CopyToClipboardContainer value={value} label={content} />;
};

export const GoogleCalendarLinkField: FunctionComponent<GoogleCalendarLinkFieldProps> =
  ({ offering }) => {
    const { value } = useAsync(
      () => getBookingOffering(offering.uuid),
      [offering],
    );
    return value && value.googlecalendar && value.googlecalendar.public ? (
      <ResourceDetailsTable>
        <div className="m-t-n google-calendar-link-field-container">
          <Field
            label={translate('Google Calendar link')}
            value={googleCalendarLink(value.googlecalendar.http_link)}
          />
        </div>
      </ResourceDetailsTable>
    ) : null;
  };
