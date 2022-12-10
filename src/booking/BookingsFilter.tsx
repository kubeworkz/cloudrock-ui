import { FunctionComponent } from 'react';
import { Row } from 'react-bootstrap';
import { reduxForm } from 'redux-form';

import {
  BookingStateFilter,
  getStates,
} from '@cloudrock/booking/BookingStateFilter';
import { BOOKINGS_FILTER_FORM_ID } from '@cloudrock/booking/store/constants';

const PureBookingsFilter: FunctionComponent = () => (
  <Row style={{ margin: '0' }}>
    <BookingStateFilter />
  </Row>
);

const enhance = reduxForm({
  form: BOOKINGS_FILTER_FORM_ID,
  initialValues: {
    state: [getStates()[0], getStates()[1]],
  },
});

export const BookingsFilter = enhance(PureBookingsFilter);
