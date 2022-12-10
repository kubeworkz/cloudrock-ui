import { formatDate } from '@cloudrock/core/dateUtils';
import { translate } from '@cloudrock/i18n';
import { Field } from '@cloudrock/resource/summary';

export const ProjectCreateExpandableRow = ({ row }) => (
  <dl className="dl-horizontal col-sm-12">
    <Field label={translate('Project name')} value={row.name} />
    <Field label={translate('Description')} value={row.description} />
    {row.end_date && (
      <Field
        label={translate('Termination date')}
        value={formatDate(row.end_date)}
      />
    )}
  </dl>
);
