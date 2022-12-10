import { connect } from 'react-redux';

import { Link } from '@cloudrock/core/Link';
import { translate } from '@cloudrock/i18n';
import { RootState } from '@cloudrock/store/reducers';
import { ImageTablePlaceholder } from '@cloudrock/table/ImageTablePlaceholder';
import { getCustomer, isOwnerOrStaff } from '@cloudrock/workspace/selectors';
import { Customer } from '@cloudrock/workspace/types';

const TwoDocumentsIllustration: string = require('@cloudrock/images/table-placeholders/undraw_no_data_qbuo.svg');

const PureOfferingsListTablePlaceholder = ({
  customer,
  isOwnerOrStaff,
}: {
  customer: Customer;
  isOwnerOrStaff: boolean;
}) => (
  <ImageTablePlaceholder
    illustration={TwoDocumentsIllustration}
    title={translate('Nothing to see here')}
    description={
      customer?.is_service_provider && isOwnerOrStaff
        ? translate(
            'You can start filling this table by creating your first offering.',
          )
        : null
    }
    action={
      customer?.is_service_provider &&
      isOwnerOrStaff && (
        <Link
          state="marketplace-offering-create"
          className="btn btn-success btn-md"
        >
          {translate('Add new offering')}
        </Link>
      )
    }
  />
);

export const OfferingsListTablePlaceholder = connect((state: RootState) => ({
  customer: getCustomer(state),
  isOwnerOrStaff: isOwnerOrStaff(state),
}))(PureOfferingsListTablePlaceholder);
