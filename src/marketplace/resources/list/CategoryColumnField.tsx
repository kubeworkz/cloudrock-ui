import { FunctionComponent } from 'react';

import { formatFilesize } from '@cloudrock/core/utils';
import { CategoryColumn } from '@cloudrock/marketplace/types';

import { ResourceDetailsLink } from '../ResourceDetailsLink';
import { Resource } from '../types';

interface CategoryColumnFieldProps {
  row: Resource;
  column: CategoryColumn;
}

export const CategoryColumnField: FunctionComponent<CategoryColumnFieldProps> =
  (props) => {
    const metadata = props.row.backend_metadata;
    const value = props.column.attribute
      ? metadata[props.column.attribute]
      : undefined;

    switch (props.column.widget) {
      case 'csv':
        if (!Array.isArray(value) || value.length === 0) {
          return 'N/A';
        }
        return value.join(', ');

      case 'filesize':
        return formatFilesize(value);

      case 'attached_instance':
        return (
          <ResourceDetailsLink
            item={{
              offering_type: 'OpenStackTenant.Instance',
              resource_uuid: metadata.instance_uuid,
              resource_type: 'OpenStackTenant.Instance',
            }}
          >
            {metadata.instance_name}
          </ResourceDetailsLink>
        );

      default:
        return value || 'N/A';
    }
  };
