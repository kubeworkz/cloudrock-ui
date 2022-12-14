import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { openModalDialog } from '@cloudrock/modal/actions';

const PlanDescription = lazyComponent(
  () => import(/* webpackChunkName: "PlanDescription" */ './PlanDescription'),
  'PlanDescription',
);
const PlanDetailsDialog = lazyComponent(
  () =>
    import(/* webpackChunkName: "PlanDetailsDialog" */ './PlanDetailsDialog'),
  'PlanDetailsDialog',
);

export const showOfferingPlanDescription = (planDescription) =>
  openModalDialog(PlanDescription, {
    resolve: { plan_description: planDescription },
    size: 'lg',
  });

export const showPlanDetailsDialog = (resourceId) =>
  openModalDialog(PlanDetailsDialog, {
    resolve: { resourceId },
    size: 'lg',
  });
