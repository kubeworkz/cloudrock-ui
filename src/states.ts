import { states as authCallbackRoutes } from '@cloudrock/auth/callbacks/routes';
import { states as authRoutes } from '@cloudrock/auth/routes';
import { states as customerRoutes } from '@cloudrock/customer/routes';
import { states as errorRoutes } from '@cloudrock/error/routes';
import { states as invitationsRoutes } from '@cloudrock/invitations/routes';
import { states as invoicesRoutes } from '@cloudrock/invoices/routes';
import { states as issuesRoutes } from '@cloudrock/issues/routes';
import { states as marketplaceChecklistRoutes } from '@cloudrock/marketplace-checklist/routes';
import { states as marketplaceRemoteRoutes } from '@cloudrock/marketplace-remote/routes';
import { states as marketplaceRoutes } from '@cloudrock/marketplace/routes';
import { states as openstackAnalyticsRoutes } from '@cloudrock/openstack/analytics/routes';
import { states as paypalRoutes } from '@cloudrock/paypal/routes';
import { states as projectRoutes } from '@cloudrock/project/routes';
import { states as rancherRoutes } from '@cloudrock/rancher/routes';
import { states as resourceRoutes } from '@cloudrock/resource/routes';
import { states as resourceSupportRoutes } from '@cloudrock/resource/support/routes';
import { states as supportRoutes } from '@cloudrock/support/routes';
import { states as userRoutes } from '@cloudrock/user/routes';

import { states as aboutRoutes } from './about';
import { StateDeclaration } from './core/types';
// Errors module should be the last, because it contains special route.
// Route with url='*path' allows to display error page without redirect.

export const states: StateDeclaration[] = [
  ...authRoutes,
  ...authCallbackRoutes,
  ...customerRoutes,
  ...projectRoutes,
  ...userRoutes,
  ...invitationsRoutes,
  ...invoicesRoutes,
  ...issuesRoutes,
  ...marketplaceRoutes,
  ...marketplaceChecklistRoutes,
  ...marketplaceRemoteRoutes,
  ...supportRoutes,
  ...openstackAnalyticsRoutes,
  ...paypalRoutes,
  ...rancherRoutes,
  ...resourceRoutes,
  ...resourceSupportRoutes,
  ...aboutRoutes,
  ...errorRoutes,
];
