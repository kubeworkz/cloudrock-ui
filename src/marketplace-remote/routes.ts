import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { StateDeclaration } from '@cloudrock/core/types';

const OrganizationProjectUpdateRequestListContainer = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "OrganizationProjectUpdateRequestListContainer" */ './OrganizationProjectUpdateRequestListContainer'
    ),
  'OrganizationProjectUpdateRequestListContainer',
);

const ProjectUpdateRequestListContainer = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "ProjectUpdateRequestListContainer" */ './ProjectUpdateRequestListContainer'
    ),
  'ProjectUpdateRequestListContainer',
);

export const states: StateDeclaration[] = [
  {
    name: 'marketplace-organization-project-update-requests',
    url: 'marketplace-project-update-requests/',
    component: OrganizationProjectUpdateRequestListContainer,
    parent: 'organization',
  },
  {
    name: 'marketplace-project-update-requests',
    url: 'marketplace-project-update-requests/',
    component: ProjectUpdateRequestListContainer,
    parent: 'project',
  },
];
