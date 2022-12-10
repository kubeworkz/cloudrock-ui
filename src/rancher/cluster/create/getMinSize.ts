import { ENV } from '@cloudrock/configs/default';

export const getMinSize = (mountPoint) =>
  ENV.plugins.CLOUDROCK_RANCHER.MOUNT_POINT_MIN_SIZE[mountPoint];
