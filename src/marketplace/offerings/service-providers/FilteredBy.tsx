import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { getFormValues } from 'redux-form';

import { translate } from '@cloudrock/i18n';
import { OFFERING_CATEGORY_SECTION_FORM_ID } from '@cloudrock/marketplace/offerings/service-providers/constants';
import { RootState } from '@cloudrock/store/reducers';
import './FilteredBy.scss';

const offeringCategorySectionFormSelector = (state: RootState) =>
  getFormValues(OFFERING_CATEGORY_SECTION_FORM_ID)(state);

// todo WIP
export const FilteredBy: FunctionComponent = () => {
  const form = useSelector(offeringCategorySectionFormSelector);

  // eslint-disable-next-line no-console
  console.log('form', form);
  return (
    <div className="filteredBy">
      <h3>{form ? translate('Filtered by') : translate('Showing all')}</h3>
    </div>
  );
};
