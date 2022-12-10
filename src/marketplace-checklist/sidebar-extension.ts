import { SidebarExtensionService } from '@cloudrock/navigation/sidebar/SidebarExtensionService';
import {
  USER_WORKSPACE,
  SUPPORT_WORKSPACE,
  ORGANIZATION_WORKSPACE,
} from '@cloudrock/workspace/types';

import {
  getMenuForUser,
  getMenuForSupport,
  getMenuForOrganization,
} from './utils';

SidebarExtensionService.register(USER_WORKSPACE, getMenuForUser);
SidebarExtensionService.register(SUPPORT_WORKSPACE, getMenuForSupport);
SidebarExtensionService.register(
  ORGANIZATION_WORKSPACE,
  getMenuForOrganization,
);
