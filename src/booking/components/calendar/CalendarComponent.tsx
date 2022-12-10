import { lazyComponent } from '@cloudrock/core/lazyComponent';

import type { CalendarComponentProps } from './LazyCalendarComponent';

export const CalendarComponent = lazyComponent<CalendarComponentProps>(
  () =>
    import(
      /* webpackChunkName: "LazyCalendarComponent" */ './LazyCalendarComponent'
    ),
  'LazyCalendarComponent',
);
