import { useCurrentStateAndParams, useRouter } from '@uirouter/react';
import { FunctionComponent } from 'react';
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useAsync } from 'react-use';

import { getById } from '@cloudrock/core/api';
import { formatRelative, formatDateTime } from '@cloudrock/core/dateUtils';
import { FormattedHtml } from '@cloudrock/core/FormattedHtml';
import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { translate } from '@cloudrock/i18n';
import { useTitle } from '@cloudrock/navigation/title';
import { Field } from '@cloudrock/resource/summary';
import { ResourceDetailsTable } from '@cloudrock/resource/summary/ResourceDetailsTable';
import { getUser } from '@cloudrock/workspace/selectors';

import { IssueAttachmentsContainer } from './attachments/IssueAttachmentsContainer';
import { IssueCommentsContainer } from './comments/IssueCommentsContainer';
import { useSupport } from './hooks';

const linkify = (s) =>
  s.replace(
    /\[(.+?)\|(.+)\]/g,
    (_, name, href) => `<a href="${href}">${name}</a>`,
  );

const loadIssue = (id) => getById<any>('/support-issues/', id);

export const IssueDetails: FunctionComponent = () => {
  const currentUser = useSelector(getUser);

  useTitle(translate('Request detail'));

  const {
    params: { uuid },
  } = useCurrentStateAndParams();
  const router = useRouter();

  if (!uuid) {
    router.stateService.go('errorPage.notFound');
  }

  const { loading, error, value: issue } = useAsync(() => loadIssue(uuid));

  useSupport();

  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <>{translate('Unable to load data.')}</>;
  }

  const staffOrSupport = currentUser.is_staff || currentUser.is_support;
  return (
    <>
      <div className="ibox">
        <div className="ibox-content">
          <div className="row m-b-md">
            <div className="col-lg-12">
              <h2>
                {issue.key ? `${issue.key}: ${issue.summary}` : issue.summary}
              </h2>
            </div>
          </div>
          <div className="row m-b-md">
            <Col sm={12}>
              <ResourceDetailsTable>
                <Field
                  label={translate('Caller')}
                  value={issue.caller_full_name}
                />

                {issue.reporter_name && staffOrSupport && (
                  <Field
                    label={translate('Reporter')}
                    value={issue.reporter_name}
                  />
                )}

                {staffOrSupport && (
                  <Field
                    label={translate('Assigned to')}
                    value={issue.assignee_name || 'N/A'}
                  />
                )}

                {issue.customer_name && (
                  <Field
                    label={translate('Organization')}
                    value={issue.customer_name}
                  />
                )}

                <Field label={translate('Request type')} value={issue.type} />

                {issue.project_name && (
                  <Field
                    label={translate('Project')}
                    value={issue.project_name}
                  />
                )}

                {issue.resource_type && (
                  <Field
                    label={translate('Service type')}
                    value={issue.resource_type}
                  />
                )}

                {issue.resource_name && (
                  <Field
                    label={translate('Affected resource')}
                    value={issue.resource_name}
                  />
                )}

                <Field
                  label={translate('Status')}
                  value={issue.status || 'N/A'}
                />

                {issue.resolution && (
                  <Field
                    label={translate('Resolution')}
                    value={issue.resolution}
                  />
                )}

                {issue.priority && (
                  <Field label={translate('Priority')} value={issue.priority} />
                )}

                {issue.link && staffOrSupport && (
                  <Field
                    label={translate('Link')}
                    value={
                      <a
                        href={issue.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa fa-external-link" />{' '}
                        {translate('Open in Service Desk')}
                      </a>
                    }
                  />
                )}

                <Field
                  label={translate('Created')}
                  value={translate('{relative} ago, {date}', {
                    relative: formatRelative(issue.created),
                    date: formatDateTime(issue.created),
                  })}
                />
              </ResourceDetailsTable>
            </Col>

            <Col sm={12}>
              <h3>{translate('Description')}</h3>
              <div className="html-description">
                <FormattedHtml html={linkify(issue.description)} />
              </div>
            </Col>
          </div>
        </div>
      </div>

      <IssueAttachmentsContainer issue={issue} />

      <IssueCommentsContainer issue={issue} />
    </>
  );
};
