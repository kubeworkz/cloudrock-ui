import { FunctionComponent } from 'react';
import { Col, Row } from 'react-bootstrap';

import { BookingsFilter } from '@cloudrock/booking/BookingsFilter';
import { BookingsList } from '@cloudrock/booking/BookingsList';
import { BookingsCalendar } from '@cloudrock/customer/dashboard/BookingsCalendar';
import { useBookingsCalendarProps } from '@cloudrock/customer/dashboard/utils';

interface OfferingBookingTab {
  offeringUuid: string;
}

export const OfferingBookingTab: FunctionComponent<OfferingBookingTab> = ({
  offeringUuid,
}) => {
  const bookingsCalendarProps = useBookingsCalendarProps();
  return (
    <Row>
      <Col md={6}>
        <BookingsCalendar
          offeringUuid={offeringUuid}
          {...bookingsCalendarProps}
        />
      </Col>
      <Col md={6}>
        <BookingsFilter />
        <BookingsList offeringUuid={offeringUuid} />
      </Col>
    </Row>
  );
};
