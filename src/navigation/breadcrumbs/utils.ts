import { translate } from '@cloudrock/i18n';
import { BreadcrumbItem } from '@cloudrock/navigation/breadcrumbs/types';

export const getOrganizationWorkspaceBreadcrumb = (): BreadcrumbItem[] => [
  {
    label: translate('Organization workspace'),
    state: 'organization.details',
  },
];
