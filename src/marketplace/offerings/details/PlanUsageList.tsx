import React, { FunctionComponent } from 'react';
import { compose } from 'redux';

import { withTranslation, translate } from '@cloudrock/i18n';
import { PlanRemainingColumn } from '@cloudrock/marketplace/common/PlanRemainingColumn';
import { PlanUsageButton } from '@cloudrock/marketplace/resources/plan-usage/PlanUsageButton';
import { Table, connectTable, createFetcher } from '@cloudrock/table';

interface PlanUsageListProps {
  offering_uuid: string;
}

export const TableComponent: FunctionComponent<any> = (props) => {
  const columns = [
    {
      title: translate('Name'),
      render: ({ row }) => row.plan_name,
    },
    {
      title: translate('Active count'),
      render: ({ row }) => row.usage,
      orderField: 'usage',
    },
    {
      title: translate('Limit'),
      render: ({ row }) => row.limit || 'N/A',
      orderField: 'limit',
    },
    {
      title: translate('Remaining'),
      render: PlanRemainingColumn,
      orderField: 'remaining',
    },
    {
      title: translate('Actions'),
      render: PlanUsageButton,
    },
  ];

  return (
    <Table
      {...props}
      columns={columns}
      verboseName={translate('plans')}
      showPageSizeSelector={true}
      enableExport={true}
      initialSorting={{ field: 'usage', mode: 'desc' }}
    />
  );
};

const TableOptions = {
  table: 'OfferingPlans',
  fetchData: createFetcher('marketplace-plans/usage_stats'),
  mapPropsToFilter: (props) => ({
    offering_uuid: props.offering_uuid,
  }),
  exportRow: (row) => [row.plan_name, row.limit, row.usage],
  exportFields: ['Plan', 'Limit', 'Active plan count'],
};

const connector = compose(connectTable(TableOptions), withTranslation);

export const PlanUsageList = connector(
  TableComponent,
) as React.ComponentType<PlanUsageListProps>;
