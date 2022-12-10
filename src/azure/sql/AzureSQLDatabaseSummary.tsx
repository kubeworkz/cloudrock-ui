import { AzureSQLDatabase } from '@cloudrock/azure/common/types';
import { withTranslation } from '@cloudrock/i18n';
import { ResourceLink } from '@cloudrock/resource/ResourceLink';
import { Field, ResourceSummaryProps } from '@cloudrock/resource/summary';

import { PureAzureResourceSummary } from '../AzureResourceSummary';

const PureAzureSQLDatabaseSummary = (
  props: ResourceSummaryProps<AzureSQLDatabase>,
) => {
  const { translate, resource } = props;
  return (
    <>
      <PureAzureResourceSummary {...props} />
      <Field label={translate('Server')}>
        <ResourceLink
          type="Azure.SQLServer"
          uuid={resource.server_uuid}
          project={resource.project_uuid}
          label={resource.server_name}
        />
      </Field>
      <Field label={translate('Charset')}>{resource.charset}</Field>
      <Field label={translate('Collation')}>{resource.collation}</Field>
    </>
  );
};

export const AzureSQLDatabaseSummary = withTranslation(
  PureAzureSQLDatabaseSummary,
);
