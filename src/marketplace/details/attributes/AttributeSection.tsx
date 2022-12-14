import { FunctionComponent } from 'react';

import { Section } from '@cloudrock/marketplace/types';

import { AttributeRow } from './AttributeRow';

interface AttributeSectionProps {
  section: Section;
  attributes: any;
  hideHeader: boolean;
}

export const AttributeSection: FunctionComponent<AttributeSectionProps> = (
  props,
) => (
  <>
    {!props.hideHeader && (
      <tr className="gray-bg">
        <th>{props.section.title}</th>
        <th />
      </tr>
    )}
    {props.section.attributes
      .filter((attr) => props.attributes.hasOwnProperty(attr.key))
      .map((attr, index) => (
        <AttributeRow
          key={index}
          value={props.attributes[attr.key]}
          attribute={attr}
        />
      ))}
  </>
);
