import { TranslateProps } from '@cloudrock/i18n';
import { Resource } from '@cloudrock/resource/types';

export interface ResourceSummaryProps<T extends Resource = any>
  extends TranslateProps {
  resource: T;
  hideBackendId?: boolean;
}
