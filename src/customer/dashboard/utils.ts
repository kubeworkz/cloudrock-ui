import { useSelector } from 'react-redux';

import { BookingFilterStateOption } from '@cloudrock/booking/BookingStateFilter';
import { BOOKING_RESOURCES_TABLE } from '@cloudrock/booking/constants';
import { bookingFormSelector } from '@cloudrock/booking/store/selectors';
import { RootState } from '@cloudrock/store/reducers';
import {
  selectTablePagination,
  selectTableSorting,
} from '@cloudrock/table/selectors';

import { CustomerActionsProps, Legend } from './types';

export const checkPermissions = (props: CustomerActionsProps) => {
  const isStaff = props.user.is_staff;
  const isOwner = props.customer.owners.find(
    (owner) => owner.uuid === props.user.uuid,
  );
  return isStaff || isOwner;
};

export const bookingsFilterStateSelector = (
  state: RootState,
): BookingFilterStateOption[] => bookingFormSelector(state)?.state;

export const useBookingsCalendarProps = () => {
  const bookingsFilterState = useSelector(bookingsFilterStateSelector);
  const bookingsListCurrentPage = useSelector(
    (state: RootState) =>
      selectTablePagination(state, BOOKING_RESOURCES_TABLE)?.currentPage,
  );
  const bookingsListPageSize = useSelector(
    (state: RootState) =>
      selectTablePagination(state, BOOKING_RESOURCES_TABLE)?.pageSize,
  );
  const bookingsListSorting = useSelector((state: RootState) =>
    selectTableSorting(state, BOOKING_RESOURCES_TABLE),
  );
  return {
    bookingsFilterState,
    bookingsListCurrentPage,
    bookingsListPageSize,
    bookingsListSorting,
  };
};

// Refer to https://stackoverflow.com/a/15125941
export const getDistinctColorsFromEvents = (events): Legend[] => {
  const flags = [],
    output = [];
  for (const event of events) {
    if (flags[event.color]) continue;
    flags[event.color] = true;
    output.push({
      color: event.color,
      name: event.offering_name,
    });
  }
  return output;
};
