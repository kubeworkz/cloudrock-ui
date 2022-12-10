import { UIView } from '@uirouter/react';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { StateDeclaration } from '@cloudrock/core/types';

const AnonymousLayout = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "AnonymousLayout" */ '@cloudrock/navigation/AnonymousLayout'
    ),
  'AnonymousLayout',
);
const InvalidObjectPage = lazyComponent(
  () =>
    import(/* webpackChunkName: "InvalidObjectPage" */ './InvalidObjectPage'),
  'InvalidObjectPage',
);
const InvalidQuotaPage = lazyComponent(
  () => import(/* webpackChunkName: "InvalidQuotaPage" */ './InvalidQuotaPage'),
  'InvalidQuotaPage',
);
const InvalidRoutePage = lazyComponent(
  () => import(/* webpackChunkName: "InvalidRoutePage" */ './InvalidRoutePage'),
  'InvalidRoutePage',
);

export const states: StateDeclaration[] = [
  {
    name: 'errorPage',
    component: AnonymousLayout,
    abstract: true,
  },

  {
    name: 'errorPage.notFound',
    component: InvalidObjectPage,
  },

  {
    name: 'errorPage.otherwise',
    url: '*path',
    component: InvalidRoutePage,
  },

  {
    name: 'errorPage.limitQuota',
    component: InvalidQuotaPage,
  },

  {
    name: 'next',
    component: UIView,
    onEnter: () => {
      window.location.pathname = '/next/';
    },
  },
];
