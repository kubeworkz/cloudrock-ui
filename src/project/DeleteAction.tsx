import { useSelector, useDispatch } from 'react-redux';

import { translate } from '@cloudrock/i18n';
import {
  deleteProject,
  showProjectRemoveDialog,
} from '@cloudrock/project/actions';
import { ActionItem } from '@cloudrock/resource/actions/ActionItem';
import { isOwnerOrStaff as isOwnerOrStaffSelector } from '@cloudrock/workspace/selectors';

export const DeleteAction = ({ project }) => {
  const dispatch = useDispatch();
  const isOwnerOrStaff = useSelector(isOwnerOrStaffSelector);

  const callback = () => {
    dispatch(
      showProjectRemoveDialog(
        () => dispatch(deleteProject(project)),
        project.name,
      ),
    );
  };

  return (
    <ActionItem
      title={translate('Delete')}
      action={callback}
      disabled={!isOwnerOrStaff}
    />
  );
};
