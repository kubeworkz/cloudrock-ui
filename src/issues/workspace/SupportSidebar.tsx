import { useState, useEffect, FunctionComponent } from 'react';

import { Sidebar } from '@cloudrock/navigation/sidebar/Sidebar';
import { MenuItemType } from '@cloudrock/navigation/sidebar/types';

import { IssueNavigationService } from './IssueNavigationService';

export const SupportSidebar: FunctionComponent = () => {
  const [items, setItems] = useState<MenuItemType[]>([]);

  useEffect(() => {
    IssueNavigationService.getSidebarItems().then(setItems);
  }, []);

  return <Sidebar items={items} />;
};
