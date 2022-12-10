import { Link } from '@cloudrock/core/Link';
import { isFeatureVisible } from '@cloudrock/features/connect';
import { translate } from '@cloudrock/i18n';

export const NextBranchLink = () => {
  if (!isFeatureVisible('support.next_branch')) {
    return null;
  }
  return (
    <li>
      <Link state="next">
        <i className="fa fa-question-circle"></i>{' '}
        {translate('Try out new version')}
      </Link>
    </li>
  );
};
