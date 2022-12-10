import { useSelector, useDispatch } from 'react-redux';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { openModalDialog } from '@cloudrock/modal/actions';
import { ActionItem } from '@cloudrock/resource/actions/ActionItem';
import { isStaff as isStaffSelector } from '@cloudrock/workspace/selectors';
import { Project } from '@cloudrock/workspace/types';

const MoveProjectDialog = lazyComponent(
  () =>
    import(/* webpackChunkName: "MoveProjectDialog" */ './MoveProjectDialog'),
  'MoveProjectDialog',
);

export const MoveProjectAction = ({ project }: { project: Project }) => {
  const dispatch = useDispatch();
  const isStaff = useSelector(isStaffSelector);

  const callback = () => {
    dispatch(
      openModalDialog(MoveProjectDialog, {
        resolve: { project },
      }),
    );
  };

  return (
    <ActionItem
      title={translate('Move project')}
      action={callback}
      disabled={!isStaff}
    />
  );
};
