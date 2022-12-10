import { DateTime } from 'luxon';

import { getList } from '@cloudrock/core/api';
import { parseDate } from '@cloudrock/core/dateUtils';
import { defaultCurrency } from '@cloudrock/core/formatCurrency';
import {
  getDailyQuotaCharts,
  padMissingValues,
  DateValuePair,
} from '@cloudrock/dashboard/api';
import { getScopeChartOptions } from '@cloudrock/dashboard/chart';
import { Scope, Chart } from '@cloudrock/dashboard/types';
import { translate } from '@cloudrock/i18n';
import { getActiveFixedPricePaymentProfile } from '@cloudrock/invoices/details/utils';

interface InvoiceSummary {
  year: number;
  month: number;
  price: number;
}

const formatCostChartLabel = (
  value: number,
  date: DateTime,
  isEstimate: boolean,
): string => {
  let template = translate('{value} at {date}');
  if (isEstimate) {
    template = translate('{value} at {date}, estimated');
  }
  return translate(template, {
    value: defaultCurrency(value),
    date: date.toISODate(),
  });
};

export const formatCostChart = (invoices: InvoiceSummary[], count): Chart => {
  let items: DateValuePair[] = invoices.map((invoice) => ({
    value: invoice.price,
    date: DateTime.fromObject({ year: invoice.year, month: invoice.month }),
  }));

  items.reverse();
  items = padMissingValues(items, count);
  const data = items.map((item, index) => {
    const isEstimate = index === items.length - 1;
    const date = isEstimate
      ? DateTime.now().endOf('month')
      : parseDate(item.date);
    return {
      label: formatCostChartLabel(item.value, date, isEstimate),
      value: item.value,
    };
  });

  return {
    title: translate('Estimated monthly cost'),
    data,
    current: defaultCurrency(items[items.length - 1].value),
  };
};

const getInvoiceSummary = (customer: string) =>
  getList<InvoiceSummary>('/invoices/', {
    customer,
    page_size: 12,
    field: ['year', 'month', 'price'],
  });

async function getCustomerCharts(customer: Scope): Promise<Chart[]> {
  const charts: Chart[] = [];
  if (!getActiveFixedPricePaymentProfile(customer.payment_profiles)) {
    const invoices = await getInvoiceSummary(customer.url);
    const costChart = formatCostChart(invoices, 12);
    charts.push(costChart);
  }
  const quotas = [
    {
      quota: 'nc_user_count',
      title: translate('Team size'),
    },
  ];
  const quotaCharts = await getDailyQuotaCharts(quotas, customer);
  if (quotaCharts.length) {
    charts.push(...quotaCharts);
  }
  return charts;
}

export const loadSummary = async (customer) => {
  const charts: Chart[] = await getCustomerCharts(customer);
  return charts.map((chart) => ({
    chart,
    options: getScopeChartOptions(
      chart.data.map((item) => item.label),
      chart.data.map((item) => item.value),
    ),
  }));
};
