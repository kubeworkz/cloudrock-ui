import { FunctionComponent } from 'react';

import { AttributeCell } from '@cloudrock/marketplace/common/AttributeCell';
import { Attribute } from '@cloudrock/marketplace/types';

interface AttributeRowProps {
  value: any;
  attribute: Attribute;
}

export const AttributeRow: FunctionComponent<AttributeRowProps> = (props) => (
  <tr>
    <td className="col-md-3">{props.attribute.title}</td>
    <td className="col-md-9">
      <AttributeCell attr={props.attribute} value={props.value} />
    </td>
  </tr>
);
