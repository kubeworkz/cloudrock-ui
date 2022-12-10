import { ENV } from '@cloudrock/configs/default';
import { translate } from '@cloudrock/i18n';

export const HeroButton = () =>
  ENV.plugins.CLOUDROCK_CORE.HERO_LINK_URL ? (
    <a
      className="btn btn-default btn-md m-t-md"
      style={{ fontWeight: 'bold' }}
      href={ENV.plugins.CLOUDROCK_CORE.HERO_LINK_URL}
    >
      {ENV.plugins.CLOUDROCK_CORE.HERO_LINK_LABEL || translate('Learn more')}
    </a>
  ) : null;
