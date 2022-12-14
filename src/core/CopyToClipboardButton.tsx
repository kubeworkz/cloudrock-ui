import copy from 'copy-to-clipboard';
import { useCallback, FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import { Tooltip } from '@cloudrock/core/Tooltip';
import { translate } from '@cloudrock/i18n';
import { showSuccess } from '@cloudrock/store/notify';

export const CopyToClipboardButton: FunctionComponent<{ value }> = ({
  value,
}) => {
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    copy(value);
    dispatch(showSuccess(translate('Text has been copied')));
  }, [dispatch, value]);

  return (
    <p className="m-b-sm m-t-sm">
      <a onClick={onClick}>
        <Tooltip label={translate('Copy to clipboard')} id="copyToClipboard">
          <i className="fa fa-copy fa-lg" />
        </Tooltip>
      </a>
    </p>
  );
};
