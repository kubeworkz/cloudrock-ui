import { FunctionComponent } from 'react';

import { Division } from '@cloudrock/marketplace/offerings/service-providers/shared/Division';
import { Division as DivisionType } from '@cloudrock/marketplace/types';

interface DivisionsProps {
  divisions: DivisionType[];
}

export const Divisions: FunctionComponent<DivisionsProps> = ({ divisions }) =>
  divisions && divisions.length > 0 ? (
    <div className="m-b">
      {divisions.map((division: DivisionType, index: number) => (
        <Division key={index} division={division.name} />
      ))}
    </div>
  ) : null;
