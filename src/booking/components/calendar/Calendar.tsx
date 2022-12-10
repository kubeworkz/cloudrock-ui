import { OptionsInput } from '@fullcalendar/core';

import { lazyComponent } from '@cloudrock/core/lazyComponent';

export const Calendar = lazyComponent<OptionsInput>(
  () => import(/* webpackChunkName: "LazyCalendar" */ './LazyCalendar'),
  'LazyCalendar',
);
