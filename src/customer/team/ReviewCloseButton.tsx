import React from 'react';
import { useDispatch } from 'react-redux';

import { translate } from '@cloudrock/i18n';
import { showErrorResponse, showSuccess } from '@cloudrock/store/notify';
import { ActionButton } from '@cloudrock/table/ActionButton';

import { closeReview } from './api';

interface ReviewCloseButtonProps {
  reviewId: string;
}

export const ReviewCloseButton: React.FC<ReviewCloseButtonProps> = ({
  reviewId,
}) => {
  const dispatch = useDispatch();
  const callback = async () => {
    try {
      await closeReview(reviewId);
      dispatch(showSuccess(translate('Review has been performed.')));
    } catch (e) {
      dispatch(showErrorResponse(e, translate('Unable to perform review.')));
    }
  };
  return (
    <ActionButton
      action={callback}
      title={translate('Perform review')}
      icon="fa fa-ban"
    />
  );
};
