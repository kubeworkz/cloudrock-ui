import React from 'react';
import { connect } from 'react-redux';
import { getFormValues, isValid } from 'redux-form';

import { OfferingLogo } from '@cloudrock/marketplace/common/OfferingLogo';
import { FORM_ID } from '@cloudrock/marketplace/details/constants';
import { SummaryTable } from '@cloudrock/marketplace/details/OrderSummary';
import { pricesSelector } from '@cloudrock/marketplace/details/plan/utils';
import {
  OrderSummaryProps,
  OfferingFormData,
} from '@cloudrock/marketplace/details/types';
import { Offering } from '@cloudrock/marketplace/types';
import { isVisible } from '@cloudrock/store/config';
import { getCustomer, getProject } from '@cloudrock/workspace/selectors';
import { Customer, Project } from '@cloudrock/workspace/types';

const PureOrderItemDetailsSummary: React.FC<OrderSummaryProps> = (
  props: OrderSummaryProps,
) => (
  <>
    <OfferingLogo src={props.offering.thumbnail} size="small" />
    <SummaryTable {...props} />
  </>
);

interface OrderItemDetailsSummary {
  customer: Customer;
  project?: Project;
  total: number;
  formData: OfferingFormData;
  formValid: boolean;
}

const mapStateToProps = (state, ownProps) => ({
  customer: getCustomer(state),
  project: getProject(state),
  total: pricesSelector(state, ownProps).total,
  formData: getFormValues(FORM_ID)(state),
  formValid: isValid(FORM_ID)(state),
  shouldConcealPrices: isVisible(state, 'marketplace.conceal_prices'),
});

export const OrderItemDetailsSummary = connect<
  OrderItemDetailsSummary,
  {},
  { offering: Offering }
>(mapStateToProps)(PureOrderItemDetailsSummary);
