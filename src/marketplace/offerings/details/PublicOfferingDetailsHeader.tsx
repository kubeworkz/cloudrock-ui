import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { OFFERING_TYPE_BOOKING } from '@cloudrock/booking/constants';
import { FormattedHtml } from '@cloudrock/core/FormattedHtml';
import { Link } from '@cloudrock/core/Link';
import { formatJsxTemplate, translate } from '@cloudrock/i18n';
import { OfferingItemActions } from '@cloudrock/marketplace/offerings/actions/OfferingItemActions';
import { Logo } from '@cloudrock/marketplace/offerings/service-providers/shared/Logo';
import { Category, Offering } from '@cloudrock/marketplace/types';
import { getUser } from '@cloudrock/workspace/selectors';

import './PublicOfferingDetailsHeader.scss';
import { PublicOfferingEditorButton } from './PublicOfferingEditorButton';

const GeorgiaNature = require('./../service-providers/georgia-nature.jpg');

interface PublicOfferingDetailsHeaderProps {
  offering: Offering;
  category: Category;
  refreshOffering;
}

export const PublicOfferingDetailsHeader: FunctionComponent<PublicOfferingDetailsHeaderProps> =
  ({ offering, category, refreshOffering }) => {
    const context = {
      offering: (
        <h2 className="publicOfferingDetailsHeader__card__info__header">
          {offering.name}
        </h2>
      ),
      customer: (
        <Link
          state="marketplace-service-provider.details"
          params={{ uuid: offering.customer_uuid }}
        >
          {offering.customer_name}
        </Link>
      ),
    };

    const user = useSelector(getUser);

    return (
      <div
        className="publicOfferingDetailsHeader"
        style={{
          backgroundImage: `url(${offering.image || GeorgiaNature})`,
        }}
      >
        <div className="publicOfferingDetailsHeader__card">
          <div className="publicOfferingDetailsHeader__card__info">
            {translate('{offering} by {customer}', context, formatJsxTemplate)}
            <div className="publicOfferingDetailsHeader__card__info__description">
              <FormattedHtml html={offering.description} />
            </div>
            <div className="m-t-sm">
              <Link
                state="marketplace-offering-user"
                params={{ offering_uuid: offering.uuid }}
                className="btn btn-primary m-r-sm"
              >
                {offering.type === OFFERING_TYPE_BOOKING
                  ? translate('Book')
                  : translate('Purchase')}
              </Link>
              {user && (
                <>
                  <PublicOfferingEditorButton
                    offering={offering}
                    category={category}
                    refreshOffering={refreshOffering}
                  />
                  <OfferingItemActions
                    offering={offering}
                    isPublic={true}
                    pullRight={false}
                    refreshOffering={refreshOffering}
                  />
                </>
              )}
            </div>
          </div>
          <Logo
            image={offering.thumbnail}
            placeholder={offering.name[0]}
            height={70}
            width={120}
          />
        </div>
      </div>
    );
  };
