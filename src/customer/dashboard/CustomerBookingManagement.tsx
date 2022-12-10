import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { useAsync } from 'react-use';

import { BookingsFilter } from '@cloudrock/booking/BookingsFilter';
import { BookingsList } from '@cloudrock/booking/BookingsList';
import { OFFERING_TYPE_BOOKING } from '@cloudrock/booking/constants';
import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { Panel } from '@cloudrock/core/Panel';
import { BookingsCalendar } from '@cloudrock/customer/dashboard/BookingsCalendar';
import { useBookingsCalendarProps } from '@cloudrock/customer/dashboard/utils';
import { translate } from '@cloudrock/i18n';
import {
  getProviderOfferingsCount,
  getResourcesCount,
} from '@cloudrock/marketplace/common/api';
import { getCustomer, getProject } from '@cloudrock/workspace/selectors';
import { Customer } from '@cloudrock/workspace/types';

const loadBookingOfferingsCount = (customerUuid: string, projectUuid: string) =>
  getProviderOfferingsCount({
    params: {
      customer_uuid: customerUuid,
      project_uuid: projectUuid,
      type: OFFERING_TYPE_BOOKING,
      state: ['Active', 'Paused'],
    },
  });

const loadBookingResourcesCount = (customerUuid: string, projectUuid: string) =>
  getResourcesCount({
    params: {
      customer_uuid: customerUuid,
      project_uuid: projectUuid,
      offering_type: OFFERING_TYPE_BOOKING,
    },
  });

const loadData = async (customer: Customer, projectUuid: string) => {
  const offeringsCount = customer.is_service_provider
    ? await loadBookingOfferingsCount(customer.uuid, projectUuid)
    : null;
  const resourcesCount = await loadBookingResourcesCount(
    customer.uuid,
    projectUuid,
  );
  return { offeringsCount, resourcesCount };
};

export const CustomerBookingManagement: FunctionComponent = () => {
  const customer = useSelector(getCustomer);
  const project = useSelector(getProject);
  const bookingsCalendarProps = useBookingsCalendarProps();
  const { loading, value, error } = useAsync(
    () => loadData(customer, project?.uuid),
    [customer, project],
  );
  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <h3>{translate('Unable to load booking offerings.')}</h3>;
  }
  return (value.offeringsCount && customer.is_service_provider) ||
    value.resourcesCount ? (
    <Panel title={translate('Booking management')}>
      <BookingsCalendar
        customerUuid={customer.uuid}
        projectUuid={project?.uuid}
        {...bookingsCalendarProps}
      />
      <BookingsFilter />
      <BookingsList customerUuid={customer.uuid} projectUuid={project?.uuid} />
    </Panel>
  ) : null;
};
