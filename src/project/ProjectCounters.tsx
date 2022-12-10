import { FunctionComponent } from 'react';
import { Col, Row } from 'react-bootstrap';

import { defaultCurrency } from '@cloudrock/core/formatCurrency';
import { DashboardCounter } from '@cloudrock/dashboard/DashboardCounter';
import { translate } from '@cloudrock/i18n';
import { Project } from '@cloudrock/workspace/types';

interface ProjectCountersProps {
  project: Project;
}

export const ProjectCounters: FunctionComponent<ProjectCountersProps> = (
  props,
) => (
  <Row>
    <Col md={6}>
      <DashboardCounter
        label={translate('Estimated cost')}
        value={defaultCurrency(props.project.billing_price_estimate.total)}
      />
    </Col>
  </Row>
);
