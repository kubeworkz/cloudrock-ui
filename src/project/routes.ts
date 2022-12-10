import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { StateDeclaration } from '@cloudrock/core/types';
import { PROJECT_WORKSPACE } from '@cloudrock/workspace/types';

import { loadProject } from './resolve';

const ProjectDashboardContainer = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "ProjectDashboardContainer" */ './ProjectDashboardContainer'
    ),
  'ProjectDashboardContainer',
);
const ProjectEventsView = lazyComponent(
  () =>
    import(/* webpackChunkName: "ProjectEventsList" */ './ProjectEventsList'),
  'ProjectEventsView',
);
const ProjectIssuesList = lazyComponent(
  () =>
    import(/* webpackChunkName: "ProjectIssuesList" */ './ProjectIssuesList'),
  'ProjectIssuesList',
);
const ProjectWorkspace = lazyComponent(
  () => import(/* webpackChunkName: "ProjectWorkspace" */ './ProjectWorkspace'),
  'ProjectWorkspace',
);
const ProjectTeam = lazyComponent(
  () => import(/* webpackChunkName: "team/ProjectTeam" */ './team/ProjectTeam'),
  'ProjectTeam',
);

export const states: StateDeclaration[] = [
  {
    name: 'project',
    url: '/projects/:uuid/',
    abstract: true,
    component: ProjectWorkspace,
    data: {
      auth: true,
      workspace: PROJECT_WORKSPACE,
    },
    resolve: [
      {
        token: 'project',
        deps: ['$transition$'],
        resolveFn: loadProject,
      },
    ],
  },

  {
    name: 'project.details',
    url: '',
    component: ProjectDashboardContainer,
    data: {
      pageClass: 'gray-bg',
      hideBreadcrumbs: true,
    },
  },

  {
    name: 'project.issues',
    url: 'issues/',
    component: ProjectIssuesList,
    data: {
      pageClass: 'gray-bg',
    },
  },

  {
    name: 'project.events',
    url: 'events/',
    component: ProjectEventsView,
  },

  {
    name: 'project.team',
    url: 'team/',
    component: ProjectTeam,
  },
];
