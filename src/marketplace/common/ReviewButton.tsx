import { connect } from 'react-redux';

import { translate } from '@cloudrock/i18n';
import { isVisible } from '@cloudrock/store/config';
import { RootState } from '@cloudrock/store/reducers';

import { OfferingButton } from '../common/OfferingButton';

const connector = connect((state: RootState) => ({
  isVisible: isVisible(state, 'marketplace.review'),
}));

const PureReviewButton = (props) =>
  props.isVisible ? (
    <OfferingButton icon="fa fa-comments" title={translate('Write review')} />
  ) : null;

export const ReviewButton = connector(PureReviewButton);
