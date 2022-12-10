import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { Issue } from '@cloudrock/issues/list/types';
import { ResourceActions } from '@cloudrock/marketplace/resources/actions/ResourceActions';
import { Resource } from '@cloudrock/marketplace/resources/types';

import { SupportDetailsTable } from './SupportDetailsTable';
import { SupportTabs } from './SupportTabs';

interface SupportSummaryProps {
  resource: Resource;
  summary?: string;
  issue?: Issue;
  reInitResource(): void;
}

export const SupportDetails: React.FC<SupportSummaryProps> = (props) => (
  <div className="wrapper wrapper-content">
    <div className="ibox-content">
      <Row className="m-b-md">
        <Col lg={12}>
          <ResourceActions
            resource={props.resource}
            reInitResource={props.reInitResource}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <SupportDetailsTable resource={props.resource} />
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <SupportTabs
            resource={props.resource}
            summary={props.summary}
            issue={props.issue}
          />
        </Col>
      </Row>
    </div>
  </div>
);
