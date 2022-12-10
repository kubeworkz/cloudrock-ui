import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { useAsync } from 'react-use';

import { translate } from '@cloudrock/i18n';
import { Sidebar } from '@cloudrock/navigation/sidebar/Sidebar';
import { SidebarExtensionService } from '@cloudrock/navigation/sidebar/SidebarExtensionService';
import {
  MenuItemType,
  SidebarMenuProps,
} from '@cloudrock/navigation/sidebar/types';
import { filterItems, mergeItems } from '@cloudrock/navigation/sidebar/utils';
import { RootState } from '@cloudrock/store/reducers';
import store from '@cloudrock/store/store';
import {
  getCustomer,
  getProject,
  isOwnerOrStaff,
} from '@cloudrock/workspace/selectors';
import {
  ORGANIZATION_WORKSPACE,
  PROJECT_WORKSPACE,
  USER_WORKSPACE,
} from '@cloudrock/workspace/types';

import { getPrivateUserTabs, getPublicUserTabs } from './constants';
import { StateUtilsService } from './StateUtilsService';
import { getCurrentUser } from './UsersService';

const getExtraSidebarItems = (): Promise<MenuItemType[]> => {
  return SidebarExtensionService.getItems(USER_WORKSPACE);
};

function getNavItems(user, customer, project) {
  const prevWorkspace = StateUtilsService.getPrevWorkspace();

  if (prevWorkspace === PROJECT_WORKSPACE) {
    return [
      {
        key: 'back',
        label: translate('Back to project'),
        icon: 'fa-arrow-left',
        state: 'project.details',
        params: { uuid: project.uuid },
      },
    ];
  } else if (
    prevWorkspace === ORGANIZATION_WORKSPACE &&
    (isOwnerOrStaff(store.getState()) || user.is_support)
  ) {
    return [
      {
        key: 'back',
        label: translate('Back to organization'),
        icon: 'fa-arrow-left',
        state: 'organization.dashboard',
        params: { uuid: customer.uuid },
      },
    ];
  }
  return [];
}

export const UserSidebar: FunctionComponent = () => {
  const workspaceUser = useSelector(
    (state: RootState) => state.workspace?.user,
  );
  const { value: currentUser } = useAsync(getCurrentUser);
  const currentCustomer = useSelector(getCustomer);
  const currentProject = useSelector(getProject);

  const { value } = useAsync<SidebarMenuProps>(async () => {
    if (!currentUser || !workspaceUser) {
      return { items: [] };
    }
    const sidebarItems =
      currentUser.uuid === workspaceUser.uuid
        ? filterItems([
            ...getNavItems(currentUser, currentCustomer, currentProject),
            ...getPrivateUserTabs(),
          ])
        : filterItems([
            ...getNavItems(workspaceUser, currentCustomer, currentProject),
            ...getPublicUserTabs(workspaceUser),
          ]);
    const extraItems = await getExtraSidebarItems();
    const items = mergeItems(sidebarItems, extraItems);
    return { items };
  }, [currentUser, workspaceUser]);

  return <Sidebar items={value?.items} />;
};
