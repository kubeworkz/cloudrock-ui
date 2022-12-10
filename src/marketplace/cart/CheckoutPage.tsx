import { FunctionComponent } from 'react';
import { Col, Row } from 'react-bootstrap';

import { translate } from '@cloudrock/i18n';
import { useTitle } from '@cloudrock/navigation/title';

import { BackButton } from './BackButton';
import { ForwardButton } from './ForwardButton';
import { ShoppingCart } from './ShoppingCart';
import { ShoppingCartSidebar } from './ShoppingCartSidebar';
import { ShoppingCartSteps } from './ShoppingCartSteps';

export const CheckoutPage: FunctionComponent = () => {
  useTitle(translate('Checkout'));
  return (
    <Row>
      <Col lg={8}>
        <ShoppingCartSteps />
        <ShoppingCart />
        <div className="display-flex justify-content-between m-t-md">
          <BackButton />
          <ForwardButton />
        </div>
      </Col>
      <Col lg={4}>
        <ShoppingCartSidebar />
      </Col>
    </Row>
  );
};
