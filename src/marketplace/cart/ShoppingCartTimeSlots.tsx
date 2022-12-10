import { FunctionComponent, Fragment } from 'react';

import { wrapScheduleTitleTooltip } from '@cloudrock/booking/BookingTimeSlotsField';
import { formatDateTime } from '@cloudrock/core/dateUtils';
import { translate } from '@cloudrock/i18n';

interface ScheduleType {
  id: string;
  title: string;
  start: string;
  end: string;
}

interface ShoppingCartTimeSlotsProps {
  schedules: ScheduleType[];
}

export const ShoppingCartTimeSlots: FunctionComponent<ShoppingCartTimeSlotsProps> =
  ({ schedules }) =>
    schedules?.length ? (
      <p>
        <>{translate('Time slots')}: </>
        {schedules.map((schedule, index: number) => (
          <Fragment key={schedule.id}>
            <>
              {wrapScheduleTitleTooltip(
                schedule.title,
                <>
                  {formatDateTime(schedule.start)}
                  {' - '}
                  {formatDateTime(schedule.end)}
                </>,
              )}
            </>
            <>{schedules.length - 1 !== index && ', '}</>
          </Fragment>
        ))}
      </p>
    ) : null;
