import { User, Customer } from '@cloudrock/workspace/types';

export interface CustomerActionsProps {
  user: User;
  customer: Customer;
}

export interface Legend {
  color: string;
  name: string;
}
