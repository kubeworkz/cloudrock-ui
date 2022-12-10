import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { CopyToClipboard } from '@cloudrock/marketplace/offerings/service-providers/shared/CopyToClipboard';
import './GoogleCalendarLink.scss';

interface GoogleCalendarLinkProps {
  link: string;
}

export const GoogleCalendarLink: FunctionComponent<GoogleCalendarLinkProps> = ({
  link,
}) => (
  <div className="googleCalendarLink">
    <div>
      <b>{translate('Calendar')}: </b>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="m-l-sm m-r"
      >
        {translate('Click to see Google Calendar')}
      </a>
    </div>
    <CopyToClipboard value={link} />
  </div>
);
