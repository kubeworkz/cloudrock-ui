import { TerminateAction } from '@cloudrock/marketplace/resources/terminate/TerminateAction';

const DestroyActionSubtitle = require('./DestroyActionSubtitle.md');

export const TerminateTenantAction = ({ resource }) => (
  <TerminateAction resource={resource} dialogSubtitle={DestroyActionSubtitle} />
);
