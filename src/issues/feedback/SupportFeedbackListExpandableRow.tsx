import { translate } from '@cloudrock/i18n';
import { Field } from '@cloudrock/resource/summary';
import { renderFieldOrDash } from '@cloudrock/table/utils';

export const SupportFeedbackListExpandableRow = ({ row }) => (
  <div className="container-fluid m-t">
    <dl className="dl-horizontal">
      <Field
        label={translate('Comment')}
        value={renderFieldOrDash(row.comment)}
      />
    </dl>
  </div>
);
