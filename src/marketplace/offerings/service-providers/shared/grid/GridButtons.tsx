import { FunctionComponent } from 'react';

import { TableLoadingSpinnerContainer } from '@cloudrock/table/TableLoadingSpinnerContainer';

import { GridRefreshButton } from './GridRefreshButton';

export const GridButtons: FunctionComponent<any> = (props) => (
  <div className="gridButtons btn-group">
    <GridRefreshButton {...props} />
    <TableLoadingSpinnerContainer {...props} />
  </div>
);
