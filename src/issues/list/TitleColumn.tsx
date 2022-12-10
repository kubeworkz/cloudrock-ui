import { FunctionComponent } from 'react';

import { Tooltip } from '@cloudrock/core/Tooltip';

export const TitleColumn: FunctionComponent<{ row }> = ({ row }) => (
  <Tooltip id="title-tooltip" label={row.summary}>
    <span className="ellipsis" style={{ width: 150 }}>
      {row.summary}
    </span>
  </Tooltip>
);
