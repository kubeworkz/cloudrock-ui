import { FunctionComponent } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { Panel } from '@cloudrock/core/Panel';
import { CustomerBookingManagement } from '@cloudrock/customer/dashboard/CustomerBookingManagement';
import { CategoryResourcesList } from '@cloudrock/dashboard/CategoryResourcesList';
import { DashboardHeader } from '@cloudrock/dashboard/DashboardHeader';
import { translate } from '@cloudrock/i18n';
import { ComplianceChecklists } from '@cloudrock/marketplace-checklist/ComplianceChecklists';
import { useTitle } from '@cloudrock/navigation/title';
import { ProjectResourcesFilter } from '@cloudrock/project/ProjectResourcesFilter';
import { isVisible } from '@cloudrock/store/config';
import { RootState } from '@cloudrock/store/reducers';
import { Project, PROJECT_WORKSPACE, User } from '@cloudrock/workspace/types';

import { ProjectActions } from './ProjectActions';
import { ProjectCounters } from './ProjectCounters';
import { ProjectResourcesList } from './ProjectResourcesList';

interface ProjectDashboardProps {
  user: User;
  project: Project;
  canAddUser: boolean;
}

export const ProjectDashboard: FunctionComponent<ProjectDashboardProps> = (
  props,
) => {
  useTitle(translate('Dashboard'));
  const shouldConcealPrices = useSelector((state: RootState) =>
    isVisible(state, 'marketplace.conceal_prices'),
  );
  if (!props.project) {
    return null;
  }
  if (!props.user) {
    return null;
  }
  return (
    <>
      <DashboardHeader
        title={translate('Welcome, {user}!', { user: props.user.full_name })}
        subtitle={translate('Overview of {project} project', {
          project: props.project.name,
        })}
      />
      <div style={{ paddingLeft: 10 }}>
        <Row>
          <Col md={8}>
            {!shouldConcealPrices && (
              <ProjectCounters project={props.project} />
            )}
          </Col>
          <Col md={4}>
            <ProjectActions {...props} />
          </Col>
        </Row>
        <ComplianceChecklists />
        <CustomerBookingManagement />
        <Panel title={translate('Resources')}>
          <ProjectResourcesFilter />
          <ProjectResourcesList />
        </Panel>
        <CategoryResourcesList
          scopeType={PROJECT_WORKSPACE}
          scope={props.project}
        />
      </div>
    </>
  );
};
