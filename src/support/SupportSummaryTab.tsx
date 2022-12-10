import { Panel } from 'react-bootstrap';

import { FormattedHtml } from '@cloudrock/core/FormattedHtml';
import { FormattedJira } from '@cloudrock/core/FormattedJira';
import { TranslateProps, withTranslation } from '@cloudrock/i18n';
import { Issue } from '@cloudrock/issues/list/types';

interface SupportSummaryTabProps extends TranslateProps {
  issue: Issue;
  summary?: string;
}

export const SupportSummaryTab = withTranslation(
  (props: SupportSummaryTabProps) => (
    <>
      {props.summary && (
        <p className="m-b-md">
          <FormattedHtml html={props.summary} />
        </p>
      )}
      <Panel>
        <Panel.Heading>
          <Panel.Title>{props.translate('Description')}</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <FormattedJira text={props.issue?.description} />
        </Panel.Body>
      </Panel>
    </>
  ),
);
