import { FunctionComponent } from 'react';
import { FormGroup } from 'react-bootstrap';

import { translate } from '@cloudrock/i18n';

export const IssueHeader: FunctionComponent<{ issue }> = ({ issue }) => {
  const customerName = issue.customer
    ? issue.customer.name
    : issue.project
    ? issue.project.customer_name
    : issue.resource
    ? issue.resource.customer_name
    : undefined;
  const projectName = issue.project
    ? issue.project.name
    : issue.resource
    ? issue.resource.project_name
    : undefined;
  return (
    <>
      {customerName && (
        <FormGroup>
          <strong>{translate('Organization')}: </strong>
          {customerName}
        </FormGroup>
      )}

      {projectName && (
        <FormGroup>
          <strong>{translate('Project')}: </strong>
          {projectName}
        </FormGroup>
      )}

      {issue.resource && (
        <FormGroup>
          <strong>{translate('Resource')}: </strong>
          {issue.resource.name}
        </FormGroup>
      )}

      {issue.type && (
        <FormGroup>
          <strong>{translate('Request type')}: </strong>
          {translate(issue.type)}
        </FormGroup>
      )}
    </>
  );
};
