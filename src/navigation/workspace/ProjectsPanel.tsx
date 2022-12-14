import {
  useMemo,
  useState,
  useCallback,
  useEffect,
  FunctionComponent,
} from 'react';
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { Link } from '@cloudrock/core/Link';
import { translate } from '@cloudrock/i18n';
import {
  getProject,
  getUser,
  checkCustomerUser,
} from '@cloudrock/workspace/selectors';
import { Customer, Project } from '@cloudrock/workspace/types';

import { BaseList } from './BaseList';
import { FilterGroup } from './FilterGroup';
import { useProjectFilter } from './utils';

const CreateProjectButton: FunctionComponent<{
  selectedOrganization: Customer;
}> = ({ selectedOrganization }) => {
  const user = useSelector(getUser);
  const canCreate = useMemo(
    () => checkCustomerUser(selectedOrganization, user),
    [selectedOrganization, user],
  );
  if (!selectedOrganization || !canCreate) {
    return null;
  }
  return (
    <Link
      className="pull-right btn btn-sm btn-default"
      state="organization.createProject"
      params={{
        uuid: selectedOrganization.uuid,
      }}
    >
      <i className="fa fa-plus" /> {translate('Add new project')}
    </Link>
  );
};

const EmptyProjectsPlaceholder: FunctionComponent = () => (
  <p className="text-center text-danger">
    {translate('There are no projects yet for this organization.')}
  </p>
);

const ProjectsHeader: FunctionComponent<{
  selectedOrganization?: Customer;
}> = ({ selectedOrganization }) => (
  <h3 className="m-b-md">
    {translate('Projects ({count})', {
      count: selectedOrganization?.projects?.length || 0,
    })}
  </h3>
);

const SelectProjectButton = ({ project }) => (
  <Link
    className="btn btn-xs btn-default pull-right"
    state="project.details"
    params={{ uuid: project.uuid }}
  >
    {translate('Select')}
  </Link>
);

const EmptyProjectListPlaceholder: FunctionComponent = () => (
  <span className="ellipsis">
    {translate('There are no projects matching filter.')}
  </span>
);

const ProjectListItem = ({ item }) => (
  <>
    <SelectProjectButton project={item} />
    <div className="ellipsis">{item.name}</div>
  </>
);

export const ProjectsPanel: FunctionComponent<{
  selectedOrganization: Customer;
}> = ({ selectedOrganization }) => {
  const currentProject = useSelector(getProject);
  const [selectedProject, selectProject] = useState<Project>(currentProject);

  const { filter, setFilter, filteredProjects } = useProjectFilter(
    selectedOrganization?.projects,
  );

  const selectFirstProject = useCallback(() => {
    if (
      !selectedProject &&
      selectedOrganization &&
      selectedOrganization.projects.length > 0
    ) {
      selectProject(selectedOrganization.projects[0]);
    }
  }, [selectedOrganization, selectedProject]);

  useEffect(selectFirstProject, [selectedOrganization]);

  return (
    <Col md={6} xs={12}>
      <CreateProjectButton selectedOrganization={selectedOrganization} />
      <ProjectsHeader selectedOrganization={selectedOrganization} />
      <FilterGroup
        groupId="project-search-box"
        value={filter}
        onChange={setFilter}
        placeholder={translate('Filter projects')}
      />
      {selectedOrganization && selectedOrganization.projects.length == 0 ? (
        <EmptyProjectsPlaceholder />
      ) : (
        <BaseList
          items={filteredProjects}
          selectedItem={selectedProject}
          selectItem={selectProject}
          EmptyPlaceholder={EmptyProjectListPlaceholder}
          ItemComponent={ProjectListItem}
        />
      )}
    </Col>
  );
};
