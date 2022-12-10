import React from 'react';

import { Link } from '@cloudrock/core/Link';
import { translate } from '@cloudrock/i18n';

import { BreadcrumbItem } from './types';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  activeItem?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  activeItem,
}) => (
  <ol className="breadcrumb">
    {items.map((item, index) => (
      <li key={index}>
        {item.action ? (
          <a onClick={() => item.action()}>{translate(item.label)}</a>
        ) : item.state ? (
          <Link state={item.state} params={item.params}>
            {translate(item.label)}
          </Link>
        ) : (
          translate(item.label)
        )}
      </li>
    ))}
    {activeItem && (
      <li className="active">
        <strong>{translate(activeItem)}</strong>
      </li>
    )}
  </ol>
);
