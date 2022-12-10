import { ENV } from '@cloudrock/configs/default';
import { Link } from '@cloudrock/core/Link';
import { translate } from '@cloudrock/i18n';

export const FooterLinks = () => (
  <ul className="footer-nav">
    <li>
      <Link state="policy.privacy">{translate('Privacy policy')}</Link>
    </li>
    <li>
      <Link state="tos.index">{translate('Terms of Service')}</Link>
    </li>
    {ENV.plugins.CLOUDROCK_CORE.SITE_EMAIL && (
      <li>{ENV.plugins.CLOUDROCK_CORE.SITE_EMAIL}</li>
    )}
    {ENV.plugins.CLOUDROCK_CORE.SITE_PHONE && (
      <li>{ENV.plugins.CLOUDROCK_CORE.SITE_PHONE}</li>
    )}
  </ul>
);
