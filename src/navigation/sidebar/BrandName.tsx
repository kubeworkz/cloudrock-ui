import { useRouter } from '@uirouter/react';
import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { ENV } from '@cloudrock/configs/default';
import {
  getWorkspace,
  getCustomer,
  getProject,
} from '@cloudrock/workspace/selectors';
import {
  ORGANIZATION_WORKSPACE,
  SUPPORT_WORKSPACE,
  PROJECT_WORKSPACE,
  USER_WORKSPACE,
} from '@cloudrock/workspace/types';

export const BrandName: FunctionComponent = () => {
  const router = useRouter();
  const workspace = useSelector(getWorkspace);
  const customer = useSelector(getCustomer);
  const project = useSelector(getProject);
  const onLogoClick = (event) => {
    event.preventDefault();
    switch (workspace) {
      case ORGANIZATION_WORKSPACE:
        router.stateService.go(
          'organization.dashboard',
          { uuid: customer.uuid },
          { reload: true },
        );
        break;
      case SUPPORT_WORKSPACE:
        // temporary solution till CRK-3909 (support dashboard) is done
        if (!ENV.plugins.CLOUDROCK_SUPPORT) {
          return router.stateService.go('marketplace-support-resources');
        }
        router.stateService.go('support.dashboard', { reload: true });
        break;
      case PROJECT_WORKSPACE:
        router.stateService.go(
          'project.details',
          { uuid: project.uuid },
          { reload: true },
        );
        break;
      case USER_WORKSPACE:
        router.stateService.go('profile.details', { reload: true });
        break;
      default:
        router.stateService.go('profile.details', { reload: true });
        break;
    }
  };
  return (
    <li className="brand-name hidden-xs">
      <a onClick={onLogoClick}>
        {ENV.plugins.CLOUDROCK_CORE.SIDEBAR_LOGO ? (
          <img
            src={ENV.plugins.CLOUDROCK_CORE.SIDEBAR_LOGO}
            style={{ maxHeight: 100, maxWidth: 175 }}
          />
        ) : (
          <>
            <i className="fa fa-th-large"></i>{' '}
            <span className="ellipsis">
              {ENV.plugins.CLOUDROCK_CORE.SHORT_PAGE_TITLE}
            </span>
          </>
        )}
      </a>
    </li>
  );
};
