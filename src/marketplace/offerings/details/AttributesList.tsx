import { FunctionComponent } from 'react';

import { AttributeItem } from '@cloudrock/marketplace/offerings/details/AttributeItem';
import { Section } from '@cloudrock/marketplace/types';

interface AttributesListProps {
  sections: Section[];
  attributes: any;
}

export const AttributesList: FunctionComponent<AttributesListProps> = ({
  sections,
  attributes,
}) => (
  <>
    {sections.map((section: Section, index: number) => (
      <AttributeItem
        key={index}
        index={index}
        section={section}
        attributes={attributes}
      />
    ))}
  </>
);
