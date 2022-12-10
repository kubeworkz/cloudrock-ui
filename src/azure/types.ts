import { Resource } from '@cloudrock/resource/types';

export interface AzureResource extends Resource {
  name: string;
  resource_group_name: string;
  location_name: string;
}
