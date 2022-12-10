import { FunctionComponent } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useAsync } from 'react-use';

import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { translate } from '@cloudrock/i18n';
import { getCategory, getPublicOffering } from '@cloudrock/marketplace/common/api';
import { getTabs } from '@cloudrock/marketplace/details/OfferingTabs';
import { OfferingTabsComponent } from '@cloudrock/marketplace/details/OfferingTabsComponent';
import { Offering } from '@cloudrock/marketplace/types';
import { ANONYMOUS_CONFIG } from '@cloudrock/table/api';

export const ServiceProviderOfferingsListExpandableRow: FunctionComponent<{
  row: Offering;
}> = ({ row }) => {
  const {
    loading,
    error,
    value: tabs,
  } = useAsync(async () => {
    const offering = await getPublicOffering(row.uuid, ANONYMOUS_CONFIG);
    const category = await getCategory(
      offering.category_uuid,
      ANONYMOUS_CONFIG,
    );
    return getTabs({ offering, sections: category.sections });
  }, [row]);

  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <h3>{translate('Unable to load offering details.')}</h3>
  ) : tabs.length ? (
    <div className="wrapper wrapper-content">
      <div className="white-box">
        <Row>
          <Col lg={12}>
            <OfferingTabsComponent tabs={tabs} />
          </Col>
        </Row>
      </div>
    </div>
  ) : null;
};
