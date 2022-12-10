import { FunctionComponent } from 'react';

import { formatDate, formatRelative } from '@cloudrock/core/dateUtils';
import { Link } from '@cloudrock/core/Link';
import { Tooltip } from '@cloudrock/core/Tooltip';
import { translate } from '@cloudrock/i18n';

import { IssueSubtitle } from './IssueSubtitle';
import { Issue } from './types';

interface IssueRowProps {
  item: Issue;
}

export const IssueRow: FunctionComponent<IssueRowProps> = (props) => (
  <tr>
    <td>
      <Tooltip label={props.item.type} id="issue-type-label">
        <Link
          label={props.item.key || 'N/A'}
          state="support.detail"
          params={{ uuid: props.item.uuid }}
        />
      </Tooltip>
    </td>
    <td>
      {props.item.summary}
      <br />
      <small className="text-muted">
        <IssueSubtitle item={props.item} />
      </small>
    </td>
    <td className="hidden-xs">
      <small>{formatDate(props.item.modified)}</small>
    </td>
    <td className="hidden-xs">
      <small>
        {translate('{relative} ago', {
          relative: formatRelative(props.item.created),
        })}
      </small>
    </td>
  </tr>
);
