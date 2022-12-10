import { FunctionComponent } from 'react';

import { formatDateTime } from '@cloudrock/core/dateUtils';
import { translate } from '@cloudrock/i18n';
import { Field } from '@cloudrock/resource/summary';
import { ResourceDetailsTable } from '@cloudrock/resource/summary/ResourceDetailsTable';
import { renderFieldOrDash } from '@cloudrock/table/utils';

import { BookingResource } from './types';

interface DetailedInfo {
  row: BookingResource;
  isServiceProvider: boolean;
}

export const BookingsListExpandableRow: FunctionComponent<DetailedInfo> = ({
  row,
  isServiceProvider,
}) => (
  <div className="container-fluid m-t">
    <ResourceDetailsTable>
      <Field
        label={translate('Created')}
        value={renderFieldOrDash(formatDateTime(row.created))}
      />
      {isServiceProvider && (
        <Field
          label={translate('Project')}
          value={renderFieldOrDash(row.project_name)}
        />
      )}
      <Field
        label={translate('Project description')}
        value={renderFieldOrDash(row.project_description)}
      />
      <Field
        label={translate('Booking description')}
        value={renderFieldOrDash(row.description)}
      />
    </ResourceDetailsTable>
  </div>
);
