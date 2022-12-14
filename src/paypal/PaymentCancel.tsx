import { useRouter } from '@uirouter/react';
import Qs from 'qs';
import { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { useEffectOnce } from 'react-use';

import { post } from '@cloudrock/core/api';
import { getQueryString } from '@cloudrock/core/utils';
import { translate } from '@cloudrock/i18n';
import { useTitle } from '@cloudrock/navigation/title';
import {
  showError,
  showErrorResponse,
  showSuccess,
} from '@cloudrock/store/notify';

const cancelPayment = (payload) => post('/paypal-payments/cancel/', payload);

export const PaymentCancel: FunctionComponent = () => {
  useTitle(translate('Cancel payment'));
  const dispatch = useDispatch();
  const router = useRouter();
  useEffectOnce(() => {
    (async () => {
      const qs = Qs.parse(getQueryString());
      if (!qs.token) {
        dispatch(
          showError(translate('Invalid URL. Unable to parse payment details.')),
        );
        return;
      }
      try {
        await cancelPayment({ token: qs.token });
        dispatch(
          showSuccess(translate('Payment has been processed successfully.')),
        );
        router.stateService.go('profile.details');
      } catch (error) {
        dispatch(
          showErrorResponse(error, translate('Unable to process payment.')),
        );
      }
    })();
  });
  return (
    <div className="invitation-vertical-center">
      <div className="container">
        {translate('Payment is being processed, please wait.')}
      </div>
    </div>
  );
};
