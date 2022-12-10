import { Pagination } from '@react-bootstrap/pagination';
import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';

import { Pagination as PaginationProps } from './types';

interface TablePaginationProps extends PaginationProps {
  gotoPage: (page: any) => void;
}

export const TablePagination: FunctionComponent<TablePaginationProps> = (
  props,
) =>
  props.resultCount > props.pageSize ? (
    <div className="text-right">
      <Pagination
        prev={translate('Previous')}
        next={translate('Next')}
        items={Math.ceil(props.resultCount / props.pageSize)}
        activePage={props.currentPage}
        onSelect={props.gotoPage}
        maxButtons={3}
        boundaryLinks={true}
      />
    </div>
  ) : null;
