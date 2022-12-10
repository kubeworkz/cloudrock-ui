import { FunctionComponent } from 'react';

import { ENV } from '@cloudrock/configs/default';
import { formatDateTime } from '@cloudrock/core/dateUtils';
import eventsRegistry from '@cloudrock/events/registry';
import { Table, connectTable, createFetcher } from '@cloudrock/table';
import { TableOptionsType } from '@cloudrock/table/types';

import { EventTypesButton } from './EventTypesButton';
import { ExpandableEventDetails } from './ExpandableEventDetails';

const EventDateField = ({ row }) => <>{formatDateTime(row.created)}</>;

const TableComponent: FunctionComponent<any> = (props) => {
  const { translate } = props;
  return (
    <Table
      {...props}
      columns={props.filterColumns([
        {
          title: translate('Message'),
          render: ({ row }) => eventsRegistry.formatEvent(row),
        },
        {
          title: translate('Timestamp'),
          render: EventDateField,
          orderField: 'created',
        },
      ])}
      hasQuery={true}
      verboseName={translate('events')}
      actions={<EventTypesButton />}
      enableExport={true}
      expandableRow={ExpandableEventDetails}
    />
  );
};

export const getEventsList = (extraOptions?: Partial<TableOptionsType>) => {
  const TableOptions = {
    table: 'events',
    fetchData: createFetcher('events'),
    queryField: 'message',
    exportFields: ['message', 'created'],
    exportRow: (row) => [row.message, row.created],
    ...extraOptions,
    pullInterval: () => ENV.countersTimerInterval * 1000,
  };

  return connectTable(TableOptions)(TableComponent);
};
