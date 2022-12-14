import { FunctionComponent } from 'react';

import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { translate } from '@cloudrock/i18n';
import { Section } from '@cloudrock/marketplace/types';

import './AttributeFilterList.scss';
import { AttributeFilterSection } from './AttributeFilterSection';

const SUPPORTED_TYPES = ['choice', 'list', 'boolean'];

export const prepareSections = (sections) =>
  sections
    .map((section) => ({
      ...section,
      attributes: section.attributes.filter(
        (attribute) => SUPPORTED_TYPES.indexOf(attribute.type) !== -1,
      ),
    }))
    .filter((section) => section.attributes.length > 0);

interface AttributeFilterListContainerState {
  sections: Section[];
  loading: boolean;
  loaded: boolean;
}

export const AttributeFilterList: FunctionComponent<AttributeFilterListContainerState> =
  (props) => {
    if (props.loading) {
      return <LoadingSpinner />;
    }

    if (!props.loaded) {
      return (
        <h3 className="text-center">
          {translate('Unable to load category sections.')}
        </h3>
      );
    }

    if (!props.sections.length) {
      return null;
    }

    return (
      <form>
        {prepareSections(props.sections).map((section, index) => (
          <AttributeFilterSection key={index} section={section} />
        ))}
      </form>
    );
  };
