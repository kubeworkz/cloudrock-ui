import { FunctionComponent, useMemo } from 'react';

import { EChart } from '@cloudrock/core/EChart';
import { getEChartOptions } from '@cloudrock/marketplace/resources/usage/utils';
import { OfferingComponent } from '@cloudrock/marketplace/types';

import { ComponentUsage } from './types';

interface ResourceUsageChartProps {
  offeringComponent: OfferingComponent;
  usages: ComponentUsage[];
  chartColor: string;
}

export const ResourceUsageChart: FunctionComponent<ResourceUsageChartProps> = ({
  offeringComponent,
  usages,
  chartColor,
}) => {
  const options = useMemo(
    () => getEChartOptions(offeringComponent, usages, chartColor),
    [offeringComponent, usages, chartColor],
  );
  return <EChart options={options} height="400px" />;
};
