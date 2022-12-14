import classNames from 'classnames';
import { FunctionComponent } from 'react';

import { Tooltip } from '@cloudrock/core/Tooltip';
import { translate } from '@cloudrock/i18n';

import { ISSUE_ICONS, ISSUE_TEXT_CLASSES } from './constants';

export const IssueTypeIcon: FunctionComponent<{ type }> = ({ type }) => {
  const typeId = type.toUpperCase().replace(' ', '_');
  const iconClass = ISSUE_ICONS[typeId] || ISSUE_ICONS.INCIDENT;
  const textClass = ISSUE_TEXT_CLASSES[typeId] || ISSUE_TEXT_CLASSES.INCIDENT;
  return (
    <Tooltip id="issue-type-icon" label={translate(type)}>
      <i className={classNames('fa', iconClass, textClass)} />
    </Tooltip>
  );
};
