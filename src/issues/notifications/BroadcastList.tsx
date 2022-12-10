import { FunctionComponent } from 'react';

import { formatDateTime } from '@cloudrock/core/dateUtils';
import { Panel } from '@cloudrock/core/Panel';
import { translate } from '@cloudrock/i18n';
import { useTitle } from '@cloudrock/navigation/title';
import { Table, connectTable, createFetcher } from '@cloudrock/table';
import { TableOptionsType } from '@cloudrock/table/types';

import { NotificationCreateButton } from './NotificationCreateButton';
import { NotificationExpandableRow } from './NotificationExpandableRow';

const TableComponent: FunctionComponent<any> = (props) => {
  return (
    <Table
      {...props}
      columns={[
        {
          title: translate('Author'),
          render: ({ row }) => row.author_full_name,
          orderField: 'author_full_name',
        },
        {
          title: translate('Subject'),
          render: ({ row }) => row.subject,
          orderField: 'subject',
        },
        {
          title: translate('Created at'),
          render: ({ row }) => formatDateTime(row.created),
          orderField: 'created',
        },
      ]}
      verboseName={translate('broadcast')}
      actions={<NotificationCreateButton />}
      expandableRow={NotificationExpandableRow}
    />
  );
};

const TableOptions: TableOptionsType = {
  table: 'broadcast',
  fetchData: createFetcher('broadcast_messages'),
};

const BroadcastListComponent = connectTable(TableOptions)(TableComponent);

export const BroadcastList: FunctionComponent = () => {
  useTitle(translate('Broadcast'));
  return (
    <Panel>
      <BroadcastListComponent />
    </Panel>
  );
};
