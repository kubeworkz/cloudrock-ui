import { useSelector } from 'react-redux';

import { ENV } from '@cloudrock/configs/default';
import { PullActionItem } from '@cloudrock/resource/actions/PullActionItem';
import { getUser } from '@cloudrock/workspace/selectors';

import { pullCluster } from '../../api';

export const PullClusterAction = ({ resource }) => {
  const user = useSelector(getUser);
  if (user.is_staff || !ENV.plugins.CLOUDROCK_RANCHER.READ_ONLY_MODE)
    return <PullActionItem apiMethod={pullCluster} resource={resource} />;
  return null;
};
