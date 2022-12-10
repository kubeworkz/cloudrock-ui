import React from 'react';

import { TranslateProps } from '@cloudrock/i18n';

export interface ProviderFormProps extends TranslateProps {
  container: {};
}

export interface ProviderConfig {
  name: string;
  type: string;
  component: React.ComponentType<ProviderFormProps>;
  endpoint: string;
  icon: string;
  serializer: (details: any) => any;
}

interface Customer {
  url: string;
}

export interface ProviderCreateFormData {
  customer: Customer;
  name: string;
  type: ProviderConfig;
  options: Record<string, any>;
}

export interface ProviderUpdateFormData {
  loaded: boolean;
  erred: boolean;
  provider?: any;
}
