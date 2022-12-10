import { ENV } from '@cloudrock/configs/default';

export const formatCurrency = (
  value: string | number,
  currency: string,
  fractionSize: number,
) => {
  if (typeof value === 'string') value = parseFloat(value);
  return `${currency || ''} ${new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: fractionSize,
  }).format(value)}`;
};

export const defaultCurrency = (value) => {
  if (value === undefined || value === null) {
    return value;
  }
  let fractionSize = 2;
  if (typeof value === 'string') value = parseFloat(value);
  if (value !== 0 && Math.abs(value) < 0.05) {
    fractionSize = 3;
  }
  if (value !== 0 && Math.abs(value) < 0.005) {
    fractionSize = 4;
  }
  return formatCurrency(
    value,
    ENV.plugins.CLOUDROCK_CORE.CURRENCY_NAME,
    fractionSize,
  );
};
