import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { StateDeclaration } from '@cloudrock/core/types';

const AnonymousLayout = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "AnonymousLayout" */ '@cloudrock/navigation/AnonymousLayout'
    ),
  'AnonymousLayout',
);
const PaymentApprove = lazyComponent(
  () => import(/* webpackChunkName: "PaymentApprove" */ './PaymentApprove'),
  'PaymentApprove',
);
const PaymentCancel = lazyComponent(
  () => import(/* webpackChunkName: "PaymentCancel" */ './PaymentCancel'),
  'PaymentCancel',
);

export const states: StateDeclaration[] = [
  {
    name: 'payment',
    url: '/payment/',
    abstract: true,
    component: AnonymousLayout,
    data: {
      auth: true,
    },
  },

  {
    name: 'payment.approve',
    url: 'approve/',
    component: PaymentApprove,
  },

  {
    name: 'payment.cancel',
    url: 'cancel/',
    component: PaymentCancel,
  },
];
