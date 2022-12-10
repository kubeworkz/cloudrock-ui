import { ENV } from '@cloudrock/configs/default';
import { formatDate } from '@cloudrock/core/dateUtils';
import { Tooltip } from '@cloudrock/core/Tooltip';
import { translate } from '@cloudrock/i18n';

export const EndDateTooltip = ({ end_date }) => {
  if (!end_date) {
    return null;
  }
  if (!ENV.plugins.CLOUDROCK_MARKETPLACE.ENABLE_RESOURCE_END_DATE) {
    return null;
  }
  return (
    <>
      {' '}
      <Tooltip
        id="end-date"
        label={translate('Termination date: {date}', {
          date: formatDate(end_date),
        })}
      >
        <i className="fa fa-clock-o" />
      </Tooltip>
    </>
  );
};
