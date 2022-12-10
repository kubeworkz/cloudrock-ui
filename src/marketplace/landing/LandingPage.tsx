import { ENV } from '@cloudrock/configs/default';
import { translate, TranslateProps, withTranslation } from '@cloudrock/i18n';
import { OfferingGrid } from '@cloudrock/marketplace/common/OfferingGrid';
import {
  CategoriesListType,
  OfferingsListType,
} from '@cloudrock/marketplace/types';

import { AutocompleteField } from './AutocompleteField';
import { CategoriesList } from './CategoriesList';
import { HeroSection } from './HeroSection';

interface LandingPageProps extends TranslateProps {
  categories: CategoriesListType;
  offerings: OfferingsListType;
  loadOfferings: (
    query: string,
    prevOptions,
    additional: { page: number },
  ) => any;
  gotoOffering: (offeringId: string) => void;
}

export const LandingPage = withTranslation((props: LandingPageProps) => (
  <div>
    <HeroSection
      title={
        ENV.marketplaceLandingPageTitle ||
        props.translate('Explore {deployment} Marketplace', {
          deployment: ENV.plugins.CLOUDROCK_CORE.SHORT_PAGE_TITLE,
        })
      }
    >
      <AutocompleteField
        placeholder={props.translate('Search for offerings...')}
        loadOfferings={props.loadOfferings}
        onChange={(offering: any) => props.gotoOffering(offering.uuid)}
        noOptionsMessage={() => translate('No offerings')}
      />
    </HeroSection>
    <CategoriesList {...props.categories} />
    <h2 className="m-b-md">{props.translate('Recent additions')}</h2>
    <OfferingGrid width={2} {...props.offerings} />
  </div>
));
