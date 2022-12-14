import { useEffect, useCallback, useMemo } from 'react';
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { reduxForm, change, arrayPush } from 'redux-form';

import { SubmitButton } from '@cloudrock/auth/SubmitButton';
import { ENV } from '@cloudrock/configs/default';
import { CUSTOMER_OWNER_ROLE } from '@cloudrock/core/constants';
import { CustomerPermissionsService } from '@cloudrock/customer/services/CustomerPermissionsService';
import { ProjectPermissionsService } from '@cloudrock/customer/services/ProjectPermissionsService';
import { translate } from '@cloudrock/i18n';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { showErrorResponse } from '@cloudrock/store/notify';
import { fetchListStart } from '@cloudrock/table/actions';
import { checkCustomerUser, checkIsOwner } from '@cloudrock/workspace/selectors';

import { OwnerExpirationTimeGroup } from './OwnerExpirationTimeGroup';
import { OwnerGroup } from './OwnerGroup';
import { ProjectsListGroup } from './ProjectsListGroup';
import { UserGroup } from './UserGroup';

import './EditTeamMemberDialog.scss';

const FORM_ID = 'EditTeamMemberDialog';

interface Project {
  role: string;
  permission: string;
  expiration_time: string;
  uuid: string;
  name: string;
  url: string;
}

interface EditTeamMemberDialogFormData {
  is_owner: boolean;
  expiration_time: Date;
  projects: Project[];
}

interface EditTeamMemberDialogResolve {
  editUser: any;
  currentCustomer: any;
  currentUser: any;
}

interface EditTeamMemberDialogOwnProps {
  resolve: EditTeamMemberDialogResolve;
}

const savePermissions = async (
  formData: EditTeamMemberDialogFormData,
  resolve: EditTeamMemberDialogResolve,
) => {
  if (resolve.editUser.role && !formData.is_owner) {
    await CustomerPermissionsService.delete(resolve.editUser.permission);
  } else if (!resolve.editUser.role && formData.is_owner) {
    await CustomerPermissionsService.create({
      user: resolve.editUser.url,
      role: CUSTOMER_OWNER_ROLE,
      customer: resolve.currentCustomer.url,
      expiration_time: formData.expiration_time,
    });
  } else if (
    formData.expiration_time !== resolve.editUser.expiration_time &&
    resolve.editUser.permission
  ) {
    await CustomerPermissionsService.update(resolve.editUser.permission, {
      expiration_time: formData.expiration_time,
    });
  }

  const updatePermissions = [],
    createdPermissions = [],
    permissionsToDelete = [];

  (formData.projects || []).forEach((project) => {
    const existingPermission = resolve.editUser.projects.find(
      (p) => p.permission === project.permission,
    );

    if (!existingPermission) {
      if (project.role) {
        createdPermissions.push(project);
      }
    } else if (
      project.role === existingPermission.role &&
      project.expiration_time !== existingPermission.expiration_time
    ) {
      updatePermissions.push(project);
    } else if (
      (!project.role && existingPermission.role) ||
      (project.role &&
        existingPermission.role &&
        project.role !== existingPermission.role)
    ) {
      permissionsToDelete.push(existingPermission.permission);
    }

    if (
      existingPermission &&
      project.role &&
      project.role !== existingPermission.role
    ) {
      createdPermissions.push(project);
    }
  });

  for (const permission of permissionsToDelete) {
    await ProjectPermissionsService.delete(permission);
  }

  for (const permission of updatePermissions) {
    await ProjectPermissionsService.update(permission.permission, {
      role: permission.role,
      expiration_time: permission.expiration_time,
    });
  }

  for (const project of createdPermissions) {
    await ProjectPermissionsService.create({
      user: resolve.editUser.url,
      role: project.role,
      project: project.url,
      expiration_time: project.expiration_time,
    });
  }
};

export const EditTeamMemberDialog = reduxForm<
  EditTeamMemberDialogFormData,
  EditTeamMemberDialogOwnProps
>({
  form: FORM_ID,
})(({ submitting, handleSubmit, resolve }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      change(
        FORM_ID,
        'is_owner',
        resolve.editUser.role === CUSTOMER_OWNER_ROLE,
      ),
    );
    dispatch(
      change(FORM_ID, 'expiration_time', resolve.editUser.expiration_time),
    );
    resolve.currentCustomer.projects.forEach((project) => {
      const permissionProject = resolve.editUser.projects.find(
        (permissionProject) => permissionProject.uuid === project.uuid,
      );
      dispatch(
        arrayPush(FORM_ID, 'projects', {
          url: project.url,
          permission: permissionProject ? permissionProject.permission : null,
          role: permissionProject ? permissionProject.role : null,
          expiration_time: permissionProject
            ? permissionProject.expiration_time
            : null,
        }),
      );
    });
  }, [resolve.editUser, resolve.currentCustomer.projects, dispatch]);

  const saveUser = useCallback(
    async (formData) => {
      try {
        await savePermissions(formData, resolve);
        dispatch(closeModalDialog());
        dispatch(
          fetchListStart('customer-users', {
            customer_uuid: resolve.currentCustomer.uuid,
            o: 'concatenated_name',
          }),
        );
      } catch (error) {
        dispatch(showErrorResponse(error, translate('Unable to update user.')));
      }
    },
    [dispatch, resolve],
  );

  const canChangeRole = checkCustomerUser(
    resolve.currentCustomer,
    resolve.currentUser,
  );

  const canManageOwner =
    resolve.currentUser.is_staff ||
    (checkIsOwner(resolve.currentCustomer, resolve.editUser) &&
      checkIsOwner(resolve.currentCustomer, resolve.currentUser) &&
      ENV.plugins.CLOUDROCK_CORE.OWNERS_CAN_MANAGE_OWNERS);

  const projects = useMemo(
    () =>
      resolve.currentCustomer.projects.map((project) => {
        const permissionProject = resolve.editUser.projects.find(
          (permissionProject) => permissionProject.uuid === project.uuid,
        );
        return {
          role: permissionProject ? permissionProject.role : null,
          permission: permissionProject ? permissionProject.permission : null,
          expiration_time: permissionProject
            ? permissionProject.expiration_time
            : null,
          uuid: project.uuid,
          name: project.name,
          url: project.url,
        };
      }),
    [resolve.currentCustomer.projects, resolve.editUser.projects],
  );

  return (
    <form onSubmit={handleSubmit(saveUser)} id="edit-team-member-dialog">
      <ModalHeader>
        <ModalTitle>{translate('Edit team member')}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <UserGroup editUser={resolve.editUser} />
        <OwnerGroup
          disabled={submitting}
          canChangeRole={canChangeRole}
          canManageOwner={canManageOwner}
        />
        <OwnerExpirationTimeGroup
          disabled={submitting || !canChangeRole || !canManageOwner}
        />
        <ProjectsListGroup canChangeRole={canChangeRole} projects={projects} />
      </ModalBody>
      <ModalFooter>
        <SubmitButton block={false} submitting={submitting}>
          {translate('Save')}
        </SubmitButton>
        <CloseDialogButton />
      </ModalFooter>
    </form>
  );
});
