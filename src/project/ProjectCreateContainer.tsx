import React from 'react';
import { useDispatch } from 'react-redux';

import { translate } from '@cloudrock/i18n';
import { useTitle } from '@cloudrock/navigation/title';

import { createProject, gotoProjectList } from './actions';
import { ProjectCreateForm } from './ProjectCreateForm';

export const ProjectCreateContainer: React.FC<{}> = () => {
  useTitle(translate('Create project'));
  const dispatch = useDispatch();
  const onSubmit = (data) => createProject(data, dispatch);
  const onCancel = () => gotoProjectList(null, dispatch);
  return <ProjectCreateForm onSubmit={onSubmit} onCancel={onCancel} />;
};
