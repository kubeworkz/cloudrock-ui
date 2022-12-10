import { FunctionComponent } from 'react';

import { Link } from '@cloudrock/core/Link';
import { Resource } from '@cloudrock/marketplace/resources/types';

interface ResourceCategoryFieldProps {
  row: Resource;
}

export const ResourceCategoryField: FunctionComponent<ResourceCategoryFieldProps> =
  ({ row }) => (
    <Link
      state={'marketplace-project-resources'}
      params={{
        uuid: row.project_uuid,
        category_uuid: row.category_uuid,
      }}
      label={row.category_title}
    />
  );
