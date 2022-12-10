import React from 'react';
import { connect } from 'react-redux';

import { formatDate, formatRelative } from '@cloudrock/core/dateUtils';
import { Link } from '@cloudrock/core/Link';
import { translate } from '@cloudrock/i18n';
import { IssuesListExpandableRow } from '@cloudrock/issues/list/IssuesListExpandableRow';
import { IssuesListPlaceholder } from '@cloudrock/issues/list/IssuesListPlaceholder';
import { StatusColumn } from '@cloudrock/issues/list/StatusColumn';
import { TitleColumn } from '@cloudrock/issues/list/TitleColumn';
import { RootState } from '@cloudrock/store/reducers';
import { Table, connectTable, createFetcher } from '@cloudrock/table';
import { TableProps } from '@cloudrock/table/Table';
import { Column } from '@cloudrock/table/types';
import { getUser } from '@cloudrock/workspace/selectors';

import { IssueCreateButton } from './IssueCreateButton';

interface OwnProps {
  hiddenColumns?: string[];
  scope?: Record<string, any>;
  filter?: Record<string, any>;
}

interface IssueTableProps extends TableProps, OwnProps {
  supportOrStaff: boolean;
  filterColumns(cols: Column[]): Column[];
}

export const TableComponent: React.FC<IssueTableProps> = (props) => {
  const { filterColumns, supportOrStaff, hiddenColumns, ...rest } = props;
  const columns = filterColumns([
    {
      title: translate('Key'),
      render: ({ row }) => (
        <Link
          state="support.detail"
          params={{ uuid: row.uuid }}
          label={row.key || 'N/A'}
        />
      ),
      orderField: 'key',
    },
    {
      title: translate('Status'),
      render: StatusColumn,
      orderField: 'status',
    },
    {
      title: translate('Title'),
      render: TitleColumn,
      orderField: 'summary',
    },
    {
      title: translate('Organization'),
      orderField: 'customer_name',
      render: ({ row }) => row.customer_name || 'N/A',
      visible: !hiddenColumns.includes('customer'),
    },
    {
      title: translate('Caller'),
      orderField: 'caller_full_name',
      render: ({ row }) => row.caller_full_name || 'N/A',
    },
    {
      title: translate('Assigned to'),
      orderField: 'assignee_name',
      render: ({ row }) => row.assignee_name || 'N/A',
      visible: supportOrStaff,
    },
    {
      title: translate('Created'),
      orderField: 'created',
      render: ({ row }) => <>{formatDate(row.created)}</>,
    },
    {
      title: translate('Time in progress'),
      render: ({ row }) => <>{formatRelative(row.created)}</>,
      visible: supportOrStaff,
    },
  ]);

  return (
    <Table
      {...rest}
      columns={columns}
      verboseName={translate('support requests')}
      hasQuery={true}
      showPageSizeSelector={true}
      placeholderComponent={<IssuesListPlaceholder />}
      enableExport={true}
      actions={props.scope && <IssueCreateButton scope={props.scope} />}
      expandableRow={IssuesListExpandableRow}
    />
  );
};

TableComponent.defaultProps = {
  hiddenColumns: [],
};

const exportRow = (row, props) => {
  const { supportOrStaff, hiddenColumns = [] } = props;
  const result = [
    row.key || 'N/A',
    row.status || 'N/A',
    row.summary,
    row.description,
  ];
  if (supportOrStaff && !hiddenColumns.includes('resource_type')) {
    result.push(row.resource_type || 'N/A');
  }
  if (!hiddenColumns.includes('customer')) {
    result.push(row.customer_name || 'N/A');
  }
  result.push(row.caller_full_name || 'N/A');
  if (supportOrStaff) {
    result.push(row.reporter_name || 'N/A');
  }
  if (supportOrStaff) {
    result.push(row.assignee_name || 'N/A');
  }
  result.push(formatDate(row.created));
  result.push(formatRelative(row.created));
  return result;
};

const exportFields = (props) => {
  const { supportOrStaff, hiddenColumns = [] } = props;
  return [
    translate('Key'),
    translate('Status'),
    translate('Title'),
    translate('Description'),
    supportOrStaff &&
      !hiddenColumns.includes('resource_type') &&
      translate('Service type'),
    !hiddenColumns.includes('customer') && translate('Organization'),
    translate('Caller'),
    supportOrStaff && translate('Reporter'),
    supportOrStaff && translate('Assigned to'),
    translate('Created'),
    supportOrStaff && translate('Time in progress'),
  ].filter((label) => label);
};

const TableOptions = {
  table: 'issuesList',
  fetchData: createFetcher('support-issues'),
  queryField: 'summary',
  mapPropsToFilter: (props) => props.filter,
  mapPropsToTableId: (props) => (props.scope ? [props.scope.uuid] : []),
  exportRow,
  exportFields,
};

const mapStateToProps = (state: RootState) => ({
  supportOrStaff: getUser(state)?.is_staff || getUser(state)?.is_support,
});

const connector = connect(mapStateToProps);

export const IssuesList = connector(
  connectTable(TableOptions)(TableComponent),
) as React.ComponentType<OwnProps>;
