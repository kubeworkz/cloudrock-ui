import { FunctionComponent } from 'react';

import { ENV } from '@cloudrock/configs/default';
import { Tooltip } from '@cloudrock/core/Tooltip';
import { translate } from '@cloudrock/i18n';
import { REFERRALS_TABLE } from '@cloudrock/marketplace/referral/constants';
import { ReferralTypeIcon } from '@cloudrock/marketplace/referral/ReferralTypeIcon';
import { connectTable, createFetcher, Table } from '@cloudrock/table';
import { ANONYMOUS_CONFIG } from '@cloudrock/table/api';

const TableComponent: FunctionComponent<any> = (props) => {
  const columns = [
    {
      title: translate('Title'),
      className: 'col-sm-6',
      render: ({ row }) => (
        <>
          <ReferralTypeIcon resourceType={row.resource_type} />
          {row.title}
        </>
      ),
      orderField: 'resource_type',
    },
    {
      title: translate('Published'),
      render: ({ row }) => row.published || 'N/A',
      orderField: 'published',
    },
    {
      title: translate('Publisher'),
      render: ({ row }) => row.publisher || 'N/A',
    },
    {
      title: translate('PID'),
      render: ({ row }) => (
        <Tooltip label={row.relation_type} id="relation-type-label">
          {row.pid}
        </Tooltip>
      ),
    },
  ];

  return (
    <Table
      {...props}
      columns={columns}
      verboseName={translate('referrals')}
      showPageSizeSelector={true}
    />
  );
};

const TableOptions = {
  table: REFERRALS_TABLE,
  fetchData: (request) =>
    createFetcher(
      'marketplace-offering-referrals',
      ENV.plugins.CLOUDROCK_MARKETPLACE.ANONYMOUS_USER_CAN_VIEW_OFFERINGS
        ? ANONYMOUS_CONFIG
        : undefined,
    )(request),
  mapPropsToFilter: (props) => ({ scope: props.offering.url }),
};

const enhance = connectTable(TableOptions);

export const ReferralsList = enhance(TableComponent);
