import React from 'react';
import { Col, Row } from 'react-bootstrap';
import MediaQuery from 'react-responsive';

import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { translate } from '@cloudrock/i18n';
import { OfferingsListType } from '@cloudrock/marketplace/types';

import { MobileOfferingCard } from './MobileOfferingCard';
import { OfferingCard } from './OfferingCard';

interface OfferingGridProps extends OfferingsListType {
  width?: number;
}

export const OfferingGrid: React.FC<OfferingGridProps> = (props) => {
  if (props.loading) {
    return <LoadingSpinner />;
  }

  if (!props.loaded) {
    return (
      <h3 className="text-center">{translate('Unable to load offerings.')}</h3>
    );
  }

  if (!props.items.length) {
    return (
      <h3 className="text-center">
        {translate('There are no offerings in marketplace yet.')}
      </h3>
    );
  }

  return (
    <>
      <MediaQuery maxWidth={768}>
        <table className="table table-borderless">
          <tbody>
            {props.items.map((offering, index) => (
              <MobileOfferingCard key={index} offering={offering} />
            ))}
          </tbody>
        </table>
      </MediaQuery>
      <MediaQuery minWidth={768}>
        <Row>
          {props.items.map((offering, index) => (
            <Col key={index} md={props.width} sm={6}>
              <OfferingCard offering={offering} />
            </Col>
          ))}
        </Row>
      </MediaQuery>
    </>
  );
};

OfferingGrid.defaultProps = {
  width: 3,
};
