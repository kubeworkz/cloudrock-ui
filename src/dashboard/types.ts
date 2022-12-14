import { PaymentProfile } from '@cloudrock/workspace/types';

export type ChartData = Array<{
  label: string;
  value: number | string;
}>;

export interface Chart {
  title: string;
  units?: string;
  current: number | string;
  data: ChartData;
}

export interface Scope {
  url?: string;
  payment_profiles?: PaymentProfile[];
}

export interface Quota {
  quota: string;
  title: string;
  feature?: string;
  type?: 'filesize' | 'hours';
}

export interface Action {
  title: string;
  onClick(): void;
}
