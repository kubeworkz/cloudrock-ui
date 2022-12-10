import React from 'react';
import { useAsync } from 'react-use';

import { get } from '@cloudrock/core/api';
import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { translate } from '@cloudrock/i18n';
import { getCategories } from '@cloudrock/marketplace/common/api';
import { Category } from '@cloudrock/marketplace/types';
import { Field } from '@cloudrock/resource/summary';
import { ResourceDetailsTable } from '@cloudrock/resource/summary/ResourceDetailsTable';
import { Project } from '@cloudrock/workspace/types';

interface ExpandableRow {
  label: string;
  value: number | string;
}

const parseCounters = (
  categories: Category[],
  counters: object,
): ExpandableRow[] => {
  return categories
    .map((category) => ({
      label: category.title,
      value: counters[`marketplace_category_${category.uuid}`],
    }))
    .filter((row) => row.value);
};

const getProjectCounters = (projectId: string) =>
  get(`/projects/${projectId}/counters/`).then((response) => response.data);

const combineRows = (rows: ExpandableRow[]): ExpandableRow[] =>
  rows
    .filter((item) => item.value)
    .sort((a, b) => a.label.localeCompare(b.label));

async function loadData(props): Promise<ExpandableRow[]> {
  const categories = await getCategories({
    params: { field: ['uuid', 'title'] },
  });
  const counters = await getProjectCounters(props.uuid);
  const counterRows = parseCounters(categories, counters);
  return combineRows(counterRows);
}

export const ProjectExpandableRowContainer: React.FC<{
  row: Project;
}> = (props) => {
  const { loading, error, value } = useAsync(
    () => loadData(props.row),
    [props.row],
  );
  if (loading) {
    return <LoadingSpinner />;
  } else if (error) {
    return <>{translate('Unable to load project resources.')}</>;
  } else {
    return (
      <ResourceDetailsTable>
        {value.map((row, index) => (
          <Field key={index} label={row.label} value={row.value} />
        ))}
        <Field label={translate('Backend ID')} value={props.row.backend_id} />
      </ResourceDetailsTable>
    );
  }
};
