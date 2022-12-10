import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { BookingActions } from '@cloudrock/booking/BookingActions';
import { BookingsListExpandableRow } from '@cloudrock/booking/BookingsListExpandableRow';
import { BookingStateField } from '@cloudrock/booking/BookingStateField';
import { BookingTimeSlotsField } from '@cloudrock/booking/BookingTimeSlotsField';
import {
  BOOKING_RESOURCES_TABLE,
  OFFERING_TYPE_BOOKING,
} from '@cloudrock/booking/constants';
import { translate, withTranslation } from '@cloudrock/i18n';
import { PublicResourceLink } from '@cloudrock/marketplace/resources/list/PublicResourceLink';
import { RootState } from '@cloudrock/store/reducers';
import { connectTable, createFetcher, Table } from '@cloudrock/table';
import {
  getCustomer,
  isOwnerOrStaff,
  isServiceManagerSelector,
} from '@cloudrock/workspace/selectors';
import { ORGANIZATION_WORKSPACE } from '@cloudrock/workspace/types';

import { bookingFormSelector } from './store/selectors';

type OwnProps = {
  offeringUuid?: string;
  customerUuid?: string;
  projectUuid?: string;
};

type StateProps = ReturnType<typeof mapStateToProps>;

const TableComponent: FunctionComponent<any> = (props) => {
  const columns = [
    {
      title: translate('Name'),
      render: ({ row }) => (
        <PublicResourceLink row={row} customer={props.customer} />
      ),
      orderField: 'name',
    },
    {
      title: translate('Offering'),
      render: ({ row }) => row.offering_name,
    },
    {
      title: translate('Created by'),
      render: ({ row }) => row.created_by_full_name,
    },
    {
      title: translate('State'),
      render: BookingStateField,
    },
    {
      title: translate('Time slots'),
      render: BookingTimeSlotsField,
      orderField: 'schedules',
    },
  ];

  if (props.customer.is_service_provider) {
    columns.splice(2, 0, {
      title: translate('Organization'),
      render: ({ row }) => row.customer_name,
    });
  } else if (props.workspace === ORGANIZATION_WORKSPACE) {
    columns.splice(2, 0, {
      title: translate('Project'),
      render: ({ row }) => row.project_name,
    });
  }

  if (!props.actionsDisabled) {
    columns.push({
      title: translate('Actions'),
      render: ({ row }) => (
        <BookingActions resource={row} reInitResource={() => props.fetch()} />
      ),
    });
  }
  return (
    <Table
      {...props}
      columns={columns}
      showPageSizeSelector={true}
      verboseName={translate('Bookings')}
      initialSorting={{ field: 'created', mode: 'desc' }}
      expandableRow={({ row }) => (
        <BookingsListExpandableRow
          row={row}
          isServiceProvider={props.customer.is_service_provider}
        />
      )}
    />
  );
};

const mapPropsToFilter = (props: StateProps & OwnProps) => {
  const filter: Record<string, any> = {
    offering_type: OFFERING_TYPE_BOOKING,
  };
  if (props.offeringUuid) {
    filter.offering_uuid = props.offeringUuid;
  }
  if (props.customerUuid) {
    filter.connected_customer_uuid = props.customerUuid;
  }
  if (props.projectUuid) {
    filter.project_uuid = props.projectUuid;
  }
  if (props.filter) {
    if (props.filter.state) {
      filter.state = props.filter.state.map((option) => option.value);
    }
  }
  return filter;
};

const TableOptions = {
  table: BOOKING_RESOURCES_TABLE,
  fetchData: createFetcher('booking-resources'),
  mapPropsToFilter,
};

const mapStateToProps = (state: RootState) => ({
  customer: getCustomer(state),
  actionsDisabled: !isOwnerOrStaff(state) && !isServiceManagerSelector(state),
  filter: bookingFormSelector(state),
});

const enhance = compose(
  connect(mapStateToProps),
  connectTable(TableOptions),
  withTranslation,
);

export const BookingsList = enhance(
  TableComponent,
) as React.ComponentType<OwnProps>;
