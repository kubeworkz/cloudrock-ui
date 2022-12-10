import { FunctionComponent } from 'react';

import { Link } from '@cloudrock/core/Link';
import { translate } from '@cloudrock/i18n';
import { ImageTablePlaceholder } from '@cloudrock/table/ImageTablePlaceholder';

const DocumentSearchIllustration = require('@cloudrock/images/table-placeholders/undraw_file_searching_duff.svg');

export const OrderItemslistTablePlaceholder: FunctionComponent = () => (
  <ImageTablePlaceholder
    illustration={DocumentSearchIllustration}
    title={translate(`Seems there's nothing here`)}
    description={translate(
      `You can find offerings to order in the marketplace`,
    )}
    action={
      <Link
        state="marketplace-landing-customer"
        className="btn btn-success btn-md"
      >
        {translate('Go to marketplace')}
      </Link>
    }
  />
);
