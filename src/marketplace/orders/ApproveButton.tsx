import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { wrapTooltip } from '@cloudrock/table/ActionButton';

interface ApproveButtonProps {
  onClick: () => void;
  submitting?: boolean;
  tooltip?: string;
  className?: string;
}

export const ApproveButton: FunctionComponent<ApproveButtonProps> = ({
  onClick,
  submitting,
  tooltip,
  className,
}) =>
  wrapTooltip(
    tooltip,
    <button
      type="button"
      className={className || 'btn btn-primary btn-sm'}
      onClick={onClick}
      disabled={submitting}
    >
      <i className="fa fa-check" /> {translate('Approve')}{' '}
      {submitting && <i className="fa fa-spinner fa-spin m-r-xs" />}
    </button>,
  );
