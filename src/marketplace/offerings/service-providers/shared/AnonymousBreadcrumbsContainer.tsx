import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { Breadcrumbs } from '@cloudrock/navigation/breadcrumbs/Breadcrumbs';
import { getBreadcrumbs } from '@cloudrock/navigation/breadcrumbs/store';
import './AnonymousBreadcrumbsContainer.scss';

export const AnonymousBreadcrumbsContainer: FunctionComponent = () => {
  const items = useSelector(getBreadcrumbs);
  return items ? (
    <div className="anonymousBreadcrumbsContainer">
      <Breadcrumbs items={items} />
    </div>
  ) : null;
};
