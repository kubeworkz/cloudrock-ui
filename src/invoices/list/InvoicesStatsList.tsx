import { translate } from '@cloudrock/i18n';
import { fetchInvoicesStats } from '@cloudrock/invoices/api';
import { INVOICES_STATS_TABLE } from '@cloudrock/invoices/constants';
import { getActiveFixedPricePaymentProfile } from '@cloudrock/invoices/details/utils';
import { connectTable, Table } from '@cloudrock/table';
import { DASH_ESCAPE_CODE } from '@cloudrock/table/constants';

const CostField = ({ invoiceStats, organization }) =>
  getActiveFixedPricePaymentProfile(organization.payment_profiles)
    ? DASH_ESCAPE_CODE
    : invoiceStats.aggregated_cost;

const TableComponent = (props: any) => {
  const columns = [
    {
      title: translate('Offering name'),
      render: ({ row }) => row.offering_name,
    },
    {
      title: translate('Service provider'),
      render: ({ row }) => row.service_provider_name,
    },
    {
      title: translate('Category name'),
      render: ({ row }) => row.service_category_title,
    },
    {
      title: translate('Cost'),
      render: ({ row }) => (
        <CostField invoiceStats={row} organization={props.organization} />
      ),
    },
  ];

  return (
    <Table
      {...props}
      columns={columns}
      verboseName={translate('Invoice statistics')}
      showPageSizeSelector={true}
    />
  );
};

const TableOptions = {
  table: INVOICES_STATS_TABLE,
  mapPropsToTableId: (props) => [props.invoiceUuid],
  fetchData: fetchInvoicesStats,
  mapPropsToFilter: (props) => ({
    invoice_uuid: props.invoiceUuid,
  }),
};

export const InvoicesStatsList = connectTable(TableOptions)(TableComponent);
