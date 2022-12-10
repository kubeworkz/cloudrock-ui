import { OrderItemResponse } from '@cloudrock/marketplace/orders/types';
import { AttributesType, Offering, Plan } from '@cloudrock/marketplace/types';

export interface CartState {
  items: OrderItemResponse[];
  addingItem: boolean;
  removingItem: boolean;
  updatingItem: boolean;
  creatingOrder: boolean;
}

export interface SubmitCartRequest {
  project: string;
}

export interface OrderItemRequest {
  offering: Offering;
  plan?: Plan;
  attributes?: AttributesType;
  limits?: { [key: string]: number };
}
