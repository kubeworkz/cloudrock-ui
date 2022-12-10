import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { getFormValues } from 'redux-form';

import { BookingExtraComponent } from '@cloudrock/booking/BookingCheckoutSummary';
import { FORM_ID } from '@cloudrock/marketplace/details/constants';

const marketplaceOfferingFormValuesSelector = getFormValues(FORM_ID);

export const ShoppingCartItemUpdateExtraComponent: FunctionComponent = () => {
  const marketplaceOfferingForm = useSelector(
    marketplaceOfferingFormValuesSelector,
  );
  return <BookingExtraComponent formData={marketplaceOfferingForm} />;
};
