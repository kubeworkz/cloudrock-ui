import { DateTime } from 'luxon';

import { parseDate } from '@cloudrock/core/dateUtils';
import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { registerOfferingType } from '@cloudrock/marketplace/common/registry';

const BookingDetails = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "BookingDetails" */ '@cloudrock/booking/BookingDetails'
    ),
  'BookingDetails',
);
const BookingCheckoutSummary = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "BookingCheckoutSummary" */ '@cloudrock/booking/BookingCheckoutSummary'
    ),
  'BookingCheckoutSummary',
);
const OfferingConfigurationForm = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "OfferingConfigurationForm" */ '@cloudrock/support/OfferingConfigurationForm'
    ),
  'OfferingConfigurationForm',
);
const OfferingPluginOptionsForm = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "OfferingPluginOptionsForm" */ '@cloudrock/support/OfferingPluginOptionsForm'
    ),
  'OfferingPluginOptionsForm',
);

import { OFFERING_TYPE_BOOKING } from './constants';

/* Since back-end doesn't allow slots in the past,
 * this function detects slots that are in the past and
 * sets the time to 20 minutes later in the future.
 * We add a small buffer that corresponds to max time spend on creating a booking
 */

export const handlePastSlotsForBookingOffering = (attributes) => {
  if (!attributes.schedules) {
    return attributes;
  }
  const schedules = attributes.schedules.map((schedule) => {
    return parseDate(schedule.start) <= DateTime.now()
      ? {
          ...schedule,
          start: DateTime.utc()
            .plus({ minutes: 20 })
            .toISO({ suppressMilliseconds: true }),
          end: parseDate(schedule.end)
            .toUTC()
            .toISO({ suppressMilliseconds: true }),
        }
      : {
          ...schedule,
          start: parseDate(schedule.start)
            .toUTC()
            .toISO({ suppressMilliseconds: true }),
          end: parseDate(schedule.end)
            .toUTC()
            .toISO({ suppressMilliseconds: true }),
        };
  });
  return {
    ...attributes,
    schedules,
  };
};

const serializer = (attrs) => handlePastSlotsForBookingOffering(attrs);

registerOfferingType({
  type: OFFERING_TYPE_BOOKING,
  get label() {
    return translate('Booking');
  },
  checkoutSummaryComponent: BookingCheckoutSummary,
  component: OfferingConfigurationForm,
  pluginOptionsForm: OfferingPluginOptionsForm,
  detailsComponent: BookingDetails,
  showOptions: true,
  showComponents: true,
  schedulable: true,
  serializer,
});
