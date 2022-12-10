import { Pagination } from '@react-bootstrap/pagination';
import { FunctionComponent } from 'react';

import { NextPage } from '@cloudrock/marketplace/offerings/service-providers/shared/grid/NextPage';
import { PrevPage } from '@cloudrock/marketplace/offerings/service-providers/shared/grid/PrevPage';
import { Pagination as PaginationProps } from '@cloudrock/table/types';
import './GridPagination.scss';

interface GridPaginationProps extends PaginationProps {
  gotoPage: (page: any) => void;
}

export const GridPagination: FunctionComponent<GridPaginationProps> = (props) =>
  props.resultCount > props.pageSize ? (
    <div className="gridPaginationContainer">
      <Pagination
        prev={<PrevPage />}
        next={<NextPage />}
        items={Math.ceil(props.resultCount / props.pageSize)}
        activePage={props.currentPage}
        onSelect={props.gotoPage}
        maxButtons={3}
        boundaryLinks={true}
      />
    </div>
  ) : null;
