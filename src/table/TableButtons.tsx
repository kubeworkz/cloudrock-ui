import { FunctionComponent } from 'react';
import { FormGroup } from 'react-bootstrap';

import { TableLoadingSpinnerContainer } from '@cloudrock/table/TableLoadingSpinnerContainer';

import { TableExportButton } from './TableExportButton';
import { TableRefreshButton } from './TableRefreshButton';

import './TableButtons.scss';

export const TableButtons: FunctionComponent<any> = (props) => (
  <FormGroup className="pull-right table-buttons m-l-md">
    <div className="btn-group">
      {props.rows.length > 0 && props.enableExport && (
        <TableExportButton {...props} />
      )}
      {props.actions}
      <TableRefreshButton {...props} />
      <TableLoadingSpinnerContainer {...props} />
    </div>
  </FormGroup>
);
