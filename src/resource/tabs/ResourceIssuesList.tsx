import { FunctionComponent } from 'react';

import { useSupport } from '@cloudrock/issues/hooks';
import { IssuesList } from '@cloudrock/issues/list/IssuesList';

export const ResourceIssuesList: FunctionComponent<any> = (props) => {
  useSupport();

  return (
    <IssuesList
      hiddenColumns={['customer', 'resource_type']}
      filter={{ resource: props.resource.url }}
      scope={{ resource: props.resource }}
    />
  );
};
