import { Category, Offering } from '@cloudrock/marketplace/types';
import { Customer } from '@cloudrock/workspace/types';

export interface OfferingAction {
  label: string;
  handler(): void;
}

export interface OfferingImportFormData {
  api_url: string;
  token: string;
  customer: Customer;
  offering: Offering;
  category: Category;
}
