import { FunctionComponent } from 'react';
import { Col, Row } from 'react-bootstrap';

import { isFeatureVisible } from '@cloudrock/features/connect';
import { translate } from '@cloudrock/i18n';
import { useTitle } from '@cloudrock/navigation/title';

import { IssueQuickCreate } from '../create/IssueQuickCreate';
import { useSupport } from '../hooks';
import { IssuesShortList } from '../list/IssuesShortList';

import { IssuesActivityStream } from './IssuesActivityStream';

export const IssuesDashboard: FunctionComponent = () => {
  useTitle(translate('Support dashboard'));
  useSupport();
  return (
    <Row>
      <Col md={6}>
        <IssuesShortList />
      </Col>
      <Col md={6}>
        <IssueQuickCreate />
        {isFeatureVisible('support.activity_stream') && (
          <IssuesActivityStream />
        )}
      </Col>
    </Row>
  );
};
