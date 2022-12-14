import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { StateDeclaration } from '@cloudrock/core/types';

const AnonymousLayout = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "AnonymousLayout" */ '@cloudrock/navigation/AnonymousLayout'
    ),
  'AnonymousLayout',
);

const LandingPage = lazyComponent(
  () => import(/* webpackChunkName: "LandingPage" */ './LandingPage'),
  'LandingPage',
);

const AuthInit = lazyComponent(
  () => import(/* webpackChunkName: "AuthInit" */ './AuthInit'),
  'AuthInit',
);

export const states: StateDeclaration[] = [
  {
    name: 'home',
    url: '',
    abstract: true,
    component: AnonymousLayout,
  },

  {
    name: 'login',
    url: '/login/',
    component: LandingPage,
    params: {
      toState: '',
      toParams: {},
    },
    data: {
      anonymous: true,
    },
  },

  {
    name: 'initialdata',
    parent: 'home',
    url: '/initial-data/',
    component: AuthInit,
    data: {
      auth: true,
    },
  },
];
