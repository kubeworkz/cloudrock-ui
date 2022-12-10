import { ENV } from '@cloudrock/configs/default';
import { TerminateAction } from '@cloudrock/marketplace/resources/terminate/TerminateAction';

const DestroyActionSubtitle = require('./DestroyActionSubtitle.md');

export const TerminateClusterAction = ({ resource }) =>
  !ENV.plugins.CLOUDROCK_RANCHER.READ_ONLY_MODE ? (
    <TerminateAction
      resource={resource}
      dialogSubtitle={DestroyActionSubtitle}
    />
  ) : null;
