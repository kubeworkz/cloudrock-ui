import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFormValues } from 'redux-form';

import { formatDateTime } from '@cloudrock/core/dateUtils';
import { translate } from '@cloudrock/i18n';
import {
  SUPPORT_FEEDBACK_LIST,
  SUPPORT_FEEDBACK_LIST_FILTER_FORM,
} from '@cloudrock/issues/feedback/constants';
import { IssueField } from '@cloudrock/issues/feedback/IssueField';
import { SupportFeedbackListExpandableRow } from '@cloudrock/issues/feedback/SupportFeedbackListExpandableRow';
import { getStartAndEndDatesOfMonth } from '@cloudrock/issues/utils';
import { RootState } from '@cloudrock/store/reducers';
import { connectTable, createFetcher, Table } from '@cloudrock/table';

const TableComponent = (props) => {
  const columns = [
    {
      title: translate('Issue'),
      render: IssueField,
    },
    {
      title: translate('User'),
      render: ({ row }) => row.user_full_name,
      orderField: 'user_full_name',
    },
    {
      title: translate('Evaluation'),
      render: ({ row }) => row.evaluation,
      orderField: 'evaluation',
    },
    {
      title: translate('Created'),
      render: ({ row }) => formatDateTime(row.created),
      orderField: 'created',
    },
  ];
  return (
    <Table
      {...props}
      columns={columns}
      verboseName={translate('support feedback')}
      expandableRow={SupportFeedbackListExpandableRow}
      initialSorting={{ field: 'created', mode: 'desc' }}
      hasQuery={true}
      enableExport={true}
      showPageSizeSelector={true}
    />
  );
};

const mapPropsToFilter = ({ supportFeedbackListFilter }) => {
  const filter: Record<string, string | number> = {};
  if (supportFeedbackListFilter.evaluation) {
    filter.evaluation = supportFeedbackListFilter.evaluation.value;
  }
  if (supportFeedbackListFilter.period) {
    const { start, end } = getStartAndEndDatesOfMonth(
      supportFeedbackListFilter.period.value,
    );
    filter.created_after = start;
    filter.created_before = end;
  }
  if (supportFeedbackListFilter.user) {
    filter.user = supportFeedbackListFilter.user.url;
  }
  return filter;
};

const exportRow = (row) => [
  row.issue_uuid,
  row.user_name,
  row.evaluation,
  row.created,
];

const exportFields = [
  translate('Issue'),
  translate('User'),
  translate('Evaluation'),
  translate('Created'),
];

const TableOptions = {
  table: SUPPORT_FEEDBACK_LIST,
  fetchData: createFetcher('support-feedbacks'),
  mapPropsToFilter,
  exportRow,
  exportFields,
  queryField: 'query',
};

const mapStateToProps = (state: RootState) => ({
  supportFeedbackListFilter: getFormValues(SUPPORT_FEEDBACK_LIST_FILTER_FORM)(
    state,
  ),
});

const enhance = compose(connect(mapStateToProps), connectTable(TableOptions));

export const SupportFeedbackList = enhance(TableComponent);
