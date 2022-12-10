import { Transition } from '@uirouter/react';

import { ProjectPermissionsService } from '@cloudrock/customer/services/ProjectPermissionsService';
import { router } from '@cloudrock/router';
import store from '@cloudrock/store/store';
import { UsersService } from '@cloudrock/user/UsersService';
import {
  setCurrentCustomer,
  setCurrentProject,
  setCurrentWorkspace,
} from '@cloudrock/workspace/actions';
import { PROJECT_WORKSPACE } from '@cloudrock/workspace/types';

import { getProject, getCustomer } from './api';

export function loadProject(transition: Transition) {
  if (!transition.params().uuid) {
    return router.stateService.go('errorPage.notFound');
  }

  async function loadData() {
    try {
      const user = await UsersService.getCurrentUser();
      const project = await getProject(transition.params().uuid);
      const customer = await getCustomer(project.customer_uuid);
      const permissions = await ProjectPermissionsService.getList({
        user: user.uuid,
        project: project.uuid,
      });
      project.permissions = permissions;
      store.dispatch(setCurrentCustomer(customer));
      store.dispatch(setCurrentProject(project));
      store.dispatch(setCurrentWorkspace(PROJECT_WORKSPACE));
    } catch (response) {
      if (response.status === 404) {
        router.stateService.go('errorPage.notFound');
      }
    }
  }
  return loadData();
}
