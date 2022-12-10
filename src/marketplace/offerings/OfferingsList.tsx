import { FunctionComponent } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFormValues } from 'redux-form';
import { createSelector } from 'reselect';

import { formatDateTime } from '@cloudrock/core/dateUtils';
import { BackendIdTooltip } from '@cloudrock/core/Tooltip';
import { withTranslation } from '@cloudrock/i18n';
import { getLabel } from '@cloudrock/marketplace/common/registry';
import { OfferingsListExpandableRow } from '@cloudrock/marketplace/offerings/expandable/OfferingsListExpandableRow';
import { PreviewOfferingButton } from '@cloudrock/marketplace/offerings/PreviewOfferingButton';
import {
  OFFERING_TABLE_NAME,
  PUBLIC_OFFERINGS_FILTER_FORM_ID,
} from '@cloudrock/marketplace/offerings/store/constants';
import { RootState } from '@cloudrock/store/reducers';
import { Table, connectTable, createFetcher } from '@cloudrock/table';
import { TableOptionsType } from '@cloudrock/table/types';
import {
  getCustomer,
  getUser,
  isOwnerOrStaff,
  isServiceManagerSelector,
  isSupportOnly,
} from '@cloudrock/workspace/selectors';

import { Offering } from '../types';

import { OfferingItemActions } from './actions/OfferingItemActions';
import { OfferingListActions } from './actions/OfferingListActions';
import { OfferingDetailsLink } from './details/OfferingDetailsLink';
import { OfferingsListTablePlaceholder } from './OfferingsListTablePlaceholder';
import { OfferingStateCell } from './OfferingStateCell';

const OfferingNameColumn = ({ row }) => (
  <OfferingDetailsLink offering_uuid={row.uuid}>
    {row.name}
    <BackendIdTooltip backendId={row.backend_id} />
  </OfferingDetailsLink>
);

export const TableComponent: FunctionComponent<any> = (props) => {
  const { translate } = props;

  const columns = [
    {
      title: translate('Name'),
      render: OfferingNameColumn,
      orderField: 'name',
    },
    {
      title: translate('Category'),
      render: ({ row }) => <>{row.category_title}</>,
    },
    {
      title: translate('Created'),
      render: ({ row }) => formatDateTime(row.created),
      orderField: 'created',
    },
    {
      title: translate('State'),
      render: OfferingStateCell,
    },
    {
      title: translate('Type'),
      render: ({ row }) => getLabel(row.type),
    },
  ];

  if (!props.actionsDisabled) {
    columns.push({
      title: translate('Actions'),
      render: ({ row }) => {
        return (
          <ButtonGroup>
            {!props.hideOfferingItemActions && (
              <OfferingItemActions offering={row} />
            )}
            <PreviewOfferingButton offering={row} />
          </ButtonGroup>
        );
      },
    });
  }

  return (
    <Table
      {...props}
      placeholderComponent={<OfferingsListTablePlaceholder />}
      columns={columns}
      verboseName={translate('Offerings')}
      actions={props.showOfferingListActions && <OfferingListActions />}
      initialSorting={{ field: 'created', mode: 'desc' }}
      enableExport={true}
      expandableRow={OfferingsListExpandableRow}
      hasQuery={true}
    />
  );
};

interface FilterData {
  state: { value: string }[];
}

type StateProps = Readonly<ReturnType<typeof mapStateToProps>>;

const mapPropsToFilter = (props: StateProps) => {
  const filter: Record<string, any> = {
    billable: true,
    shared: true,
  };
  if (props.customer) {
    filter.customer_uuid = props.customer.uuid;
  }
  if (props.filter?.state) {
    filter.state = props.filter.state.map((option) => option.value);
  }
  if (props.isServiceManager && !props.isOwnerOrStaff) {
    filter.service_manager_uuid = props.user.uuid;
  }
  return filter;
};

export const TableOptions: TableOptionsType = {
  table: OFFERING_TABLE_NAME,
  fetchData: createFetcher('marketplace-provider-offerings'),
  mapPropsToFilter,
  exportRow: (row: Offering) => [
    row.name,
    formatDateTime(row.created),
    row.category_title,
    row.state,
    row.type,
  ],
  exportFields: ['Name', 'Created', 'Category', 'State', 'Type'],
  queryField: 'keyword',
};

const showOfferingListActions = createSelector(
  isOwnerOrStaff,
  getCustomer,
  (ownerOrStaff, customer) =>
    customer && customer.is_service_provider && ownerOrStaff,
);

const mapStateToProps = (state: RootState) => ({
  customer: getCustomer(state),
  user: getUser(state),
  isServiceManager: isServiceManagerSelector(state),
  isOwnerOrStaff: isOwnerOrStaff(state),
  hideOfferingItemActions: isSupportOnly(state),
  showOfferingListActions: showOfferingListActions(state),
  actionsDisabled: !isOwnerOrStaff(state),
  filter: getFormValues(PUBLIC_OFFERINGS_FILTER_FORM_ID)(state) as FilterData,
});

const enhance = compose(
  connect(mapStateToProps),
  connectTable(TableOptions),
  withTranslation,
);

export const OfferingsList = enhance(TableComponent);
