import { DropdownButton, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';

import { ExternalLink } from '@cloudrock/auth/types';
import { ENV } from '@cloudrock/configs/default';
import { translate } from '@cloudrock/i18n';

interface ExternalLinksComponentProps {
  externalLinks: ExternalLink[];
  onSelect(eventKey: any): void;
}

const ExternalLinksComponent = (props: ExternalLinksComponentProps) =>
  props.externalLinks?.length > 0 && (
    <DropdownButton
      title={translate('External links')}
      id="external-link-dropdown-btn"
      onSelect={props.onSelect}
      bsStyle="link"
    >
      {props.externalLinks.map((link, index) => (
        <MenuItem eventKey={index} key={index}>
          {link.label}
        </MenuItem>
      ))}
    </DropdownButton>
  );

const mapStateToProps = () => {
  const externalLinks = ENV.plugins.CLOUDROCK_CORE.EXTERNAL_LINKS;
  return {
    externalLinks,
    onSelect: (eventKey: number) => window.open(externalLinks[eventKey].url),
  };
};

export const ExternalLinks = connect(mapStateToProps)(ExternalLinksComponent);
