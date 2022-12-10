import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { ENV } from '@cloudrock/configs/default';
import { translate } from '@cloudrock/i18n';
import { IssueNavigationService } from '@cloudrock/issues/workspace/IssueNavigationService';
import { router } from '@cloudrock/router';
import { RootState } from '@cloudrock/store/reducers';
import { getUser } from '@cloudrock/workspace/selectors';

const showLink = (state: RootState) => {
  if (ENV.plugins.CLOUDROCK_SUPPORT) {
    return true;
  }
  const user = getUser(state);
  return user && (user.is_staff || user.is_support);
};

export const SupportLink: FunctionComponent = () => {
  const visible = useSelector(showLink);

  if (!visible) {
    return null;
  }

  const gotoSupport = () => IssueNavigationService.gotoDashboard();

  const isActive =
    router.stateService.includes('support') ||
    router.stateService.is('support');

  return (
    <li>
      <a onClick={gotoSupport} className={isActive ? 'active' : ''}>
        <i className="fa fa-question-circle"></i> {translate('Support')}
      </a>
    </li>
  );
};
