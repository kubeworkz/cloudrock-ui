import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import { LanguageSelectorMenuItem } from '@cloudrock/i18n/LanguageSelectorMenuItem';
import { DocsLink } from '@cloudrock/navigation/header/DocsLink';
import { SupportLink } from '@cloudrock/navigation/header/SupportLink';
import { UserDropdownMenu } from '@cloudrock/user/UserDropdownMenu';

import './Sidebar.css';
import { BrandName } from './BrandName';
import { SidebarMenu } from './SidebarMenu';
import { SidebarMenuProps } from './types';

export const Sidebar: React.FC<SidebarMenuProps> = (props) => (
  <nav className="navbar-default navbar-static-side" role="navigation">
    <Scrollbars style={{ height: '100%' }} className="sidebar-collapse">
      <ul className="nav" id="side-menu">
        <BrandName />
        <UserDropdownMenu />
        <SidebarMenu {...props} />
      </ul>
      <ul className="nav visible-xs">
        <SupportLink />
        <LanguageSelectorMenuItem />
        <DocsLink />
      </ul>
    </Scrollbars>
  </nav>
);
