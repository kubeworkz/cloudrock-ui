import { Offering, Plan } from '@cloudrock/marketplace/types';
import { Customer, Project } from '@cloudrock/workspace/types';

export interface Limits {
  [key: string]: number;
}

export interface OfferingFormData {
  plan?: Plan;
  attributes?: { [key: string]: any };
  project?: Project;
  limits?: Limits;
  project_create_request?: any;
  customer_create_request?: any;
  customer?: any;
}

export interface OrderSummaryProps {
  offering: Offering;
  customer?: Customer;
  project?: Project;
  total?: number;
  formData: OfferingFormData;
  formValid?: boolean;
  updateMode?: boolean;
  extraComponent?: React.ComponentType<any>;
  shouldConcealPrices?: boolean;
}
