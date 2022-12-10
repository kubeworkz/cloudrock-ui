import { AsyncState } from 'react-use/lib/useAsync';

import { Resource } from '@cloudrock/marketplace/resources/types';

export interface TerminateDialogOwnProps {
  asyncState: AsyncState<Resource>;
  dialogSubtitle?: string;
}
