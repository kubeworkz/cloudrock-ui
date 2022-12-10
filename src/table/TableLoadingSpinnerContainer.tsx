import { FunctionComponent } from 'react';

import './TableLoadingSpinner.scss';
import { TableProps } from '@cloudrock/table/Table';

export const LoadingSpinner: FunctionComponent = () => (
  <span className="spinner-container">
    <i className="fa fa-spinner fa-spin" />
  </span>
);

export const TableLoadingSpinnerContainer = (props: TableProps) =>
  (props.loading && props.sorting && !props.sorting.loading) ||
  (props.sorting && props.sorting.loading) ? (
    <LoadingSpinner />
  ) : null;
