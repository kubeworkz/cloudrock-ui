import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { openModalDialog } from '@cloudrock/modal/actions';

const EventTypesDialog = lazyComponent(
  () => import(/* webpackChunkName: "EventTypesDialog" */ './EventTypesDialog'),
  'EventTypesDialog',
);

export const showEventTypes = () => openModalDialog(EventTypesDialog);
