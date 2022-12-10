import { ENV } from '@cloudrock/configs/default';
import { formatDate } from '@cloudrock/core/dateUtils';
import { translate } from '@cloudrock/i18n';
import { Field } from '@cloudrock/resource/summary';

export const ResourceCreateExpandableRow = ({ row }) => (
  <dl className="dl-horizontal col-sm-12">
    <Field label={translate('Resource name')} value={row.name} />
    <Field label={translate('Description')} value={row.description} />
    {row.end_date &&
      ENV.plugins.CLOUDROCK_MARKETPLACE.ENABLE_RESOURCE_END_DATE && (
        <Field
          label={translate('Termination date')}
          value={formatDate(row.end_date)}
        />
      )}
  </dl>
);
