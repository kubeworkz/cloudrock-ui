import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { useAsync } from 'react-use';
import { formValueSelector } from 'redux-form';

import { EChart } from '@cloudrock/core/EChart';
import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { translate } from '@cloudrock/i18n';
import { getGrowthChartData } from '@cloudrock/invoices/api';
import { GROWTH_FILTER_ID } from '@cloudrock/invoices/constants';
import { formatGrowthChart } from '@cloudrock/invoices/growth/utils';
import { RootState } from '@cloudrock/store/reducers';

const growthFilterFormSelector = formValueSelector(GROWTH_FILTER_ID);

const getAccountingRunningFieldValue = (state: RootState) =>
  growthFilterFormSelector(state, 'accounting_is_running');

export const GrowthChart: FunctionComponent = () => {
  const accountRunningState = useSelector(getAccountingRunningFieldValue);
  const {
    loading,
    error,
    value: option,
  } = useAsync(
    () =>
      getGrowthChartData(accountRunningState?.value).then(formatGrowthChart),
    [accountRunningState],
  );
  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <>{translate('Unable to load growth chart.')}</>;
  }
  return (
    <div className="ibox-content m-t-md p-m">
      <EChart options={option} height="400px" />
    </div>
  );
};
