import classNames from 'classnames';
import { FunctionComponent } from 'react';

import { ExternalLink } from '@cloudrock/core/ExternalLink';
import { FormattedHtml } from '@cloudrock/core/FormattedHtml';
import { translate } from '@cloudrock/i18n';
import {
  shouldRenderAttributesList,
  shouldRenderAttributesSection,
} from '@cloudrock/marketplace/offerings/details/utils';
import { ImagesTab } from '@cloudrock/marketplace/offerings/images/ImagesTab';
import { Category, Offering } from '@cloudrock/marketplace/types';
import './PublicOfferingDescriptionContainer.scss';

interface PublicOfferingDescriptionContainerProps {
  offering: Offering;
  category: Category;
}

export const PublicOfferingDescriptionContainer: FunctionComponent<PublicOfferingDescriptionContainerProps> =
  ({ offering, category }) => (
    <div
      className={classNames('bordered publicOfferingDescriptionContainer', {
        'publicOfferingDescriptionContainer--fullWidth': !(
          shouldRenderAttributesSection(offering) ||
          shouldRenderAttributesList(category.sections, offering.attributes)
        ),
      })}
    >
      <div className="publicOfferingDescriptionContainer__header bordered">
        <div>
          <b>{translate('Category')}: </b>
          {offering.category_title}
        </div>
        {offering.privacy_policy_link ? (
          <ExternalLink
            label={translate('Privacy Policy')}
            url={offering.privacy_policy_link}
          />
        ) : (
          <span>
            <b>{translate('Privacy Policy')}: </b>N/A
          </span>
        )}
        {offering.terms_of_service_link ? (
          <ExternalLink
            label={translate('Terms Of Service')}
            url={offering.terms_of_service_link}
          />
        ) : (
          <span>
            <b>{translate('Terms Of Service')}: </b>N/A
          </span>
        )}
      </div>
      {offering.full_description && (
        <div className="publicOfferingDescriptionContainer__description m-t-sm">
          <b>{translate('Description')}</b>
          <FormattedHtml html={offering.full_description} />
        </div>
      )}
      {offering.screenshots.length > 0 && (
        <div className="publicOfferingDescriptionContainer__screenshots m-t-sm">
          <ImagesTab images={offering.screenshots} />
        </div>
      )}
    </div>
  );
