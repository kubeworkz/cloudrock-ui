import { Transition } from '@uirouter/react';

import { getCustomer, getProject } from '@cloudrock/project/api';
import { router } from '@cloudrock/router';
import store from '@cloudrock/store/store';
import {
  setCurrentCustomer,
  setCurrentProject,
  setCurrentWorkspace,
} from '@cloudrock/workspace/actions';
import { PROJECT_WORKSPACE } from '@cloudrock/workspace/types';

import { getResource } from './api';

export function loadResource(trans: Transition) {
  if (!trans.params().resource_uuid) {
    return Promise.reject();
  }

  return getResource(trans.params().resource_type, trans.params().resource_uuid)
    .then((resource) => {
      return getProject(resource.project_uuid).then((project) => {
        return { project };
      });
    })
    .then(({ project }) => {
      return getCustomer(project.customer_uuid).then((customer) => {
        store.dispatch(setCurrentCustomer(customer));
        store.dispatch(setCurrentProject(project));
        store.dispatch(setCurrentWorkspace(PROJECT_WORKSPACE));
        return { customer, project };
      });
    })
    .catch((response) => {
      if (response.status === 404) {
        router.stateService.go('errorPage.notFound');
      }
    });
}
