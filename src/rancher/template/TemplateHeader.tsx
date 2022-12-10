import { FunctionComponent } from 'react';
import { Col, Row } from 'react-bootstrap';

import { FormattedMarkdown } from '@cloudrock/core/FormattedMarkdown';
import { OfferingLogo } from '@cloudrock/marketplace/common/OfferingLogo';

export const TemplateHeader: FunctionComponent<any> = (props) => (
  <Row>
    <Col md={3}>
      <OfferingLogo src={props.template.icon} />
    </Col>
    <Col md={9}>
      <FormattedMarkdown text={props.version.app_readme} />
    </Col>
  </Row>
);
