import { FunctionComponent } from 'react';
import { Navbar, Row } from 'react-bootstrap';

import { LanguageSelector } from '@cloudrock/i18n/LanguageSelector';
import { ShoppingCartIndicator } from '@cloudrock/marketplace/cart/ShoppingCartIndicator';
import { ComparisonIndicator } from '@cloudrock/marketplace/compare/ComparisonIndicator';
import { PendingOrderIndicator } from '@cloudrock/marketplace/orders/PendingOrderIndicator';
import { SidebarToggle } from '@cloudrock/navigation/sidebar/SidebarToggle';
import { WorkspaceLabel } from '@cloudrock/navigation/workspace/WorkspaceLabel';

import { SelectWorkspaceToggle } from '../workspace/SelectWorkspaceToggle';

import { DocsLink } from './DocsLink';
import { ExternalLinks } from './ExternalLinks';
import { LogoutLink } from './LogoutLink';
import { MainSearch } from './MainSearch';
import { NextBranchLink } from './NextBranchLink';
import { SupportLink } from './SupportLink';

export const AppHeader: FunctionComponent = () => (
  <Row className="border-bottom">
    <Navbar staticTop bsStyle="inverse" fluid className="m-b-none">
      <div style={{ display: 'flex' }}>
        <Navbar.Header className="m-b-sm">
          <SidebarToggle />
          <SelectWorkspaceToggle />
          <MainSearch />
        </Navbar.Header>
        <WorkspaceLabel />
        <ul className="nav navbar-top-links navbar-right hidden-xs-stable">
          <ExternalLinks />
          <SupportLink />
          <NextBranchLink />
          <DocsLink />
          <ComparisonIndicator />
          <PendingOrderIndicator />
          <ShoppingCartIndicator />
          <LanguageSelector />
          <LogoutLink />
        </ul>
      </div>
    </Navbar>
  </Row>
);
