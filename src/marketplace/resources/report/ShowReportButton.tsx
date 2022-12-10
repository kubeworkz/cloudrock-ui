import React from 'react';
import { useDispatch } from 'react-redux';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { Report } from '@cloudrock/marketplace/resources/types';
import { openModalDialog } from '@cloudrock/modal/actions';

const ShowReportDialog = lazyComponent(
  () => import(/* webpackChunkName: "ShowReportDialog" */ './ShowReportDialog'),
  'ShowReportDialog',
);

interface ShowReportButtonProps {
  report: Report;
}

export const openReport = (report) =>
  openModalDialog(ShowReportDialog, { resolve: { report }, size: 'lg' });

export const ShowReportButton: React.FC<ShowReportButtonProps> = ({
  report,
}) => {
  const dispatch = useDispatch();
  const callback = React.useCallback(
    () => dispatch(openReport(report)),
    [report, dispatch],
  );
  if (!report) {
    return null;
  }
  return (
    <button
      className="btn btn-info pull-right btn-sm m-l-sm"
      onClick={callback}
    >
      <i className="fa fa-book" />
      &nbsp;
      {translate('Show report')}
    </button>
  );
};
