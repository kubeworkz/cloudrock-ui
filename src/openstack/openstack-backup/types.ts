import { Resource, InternalIP } from '@cloudrock/resource/types';

import { SecurityGroupRule } from '../types';

interface NestedSecurityGroup {
  url: string;
  name: string;
  description: string;
  rules: SecurityGroupRule[];
}

export interface OpenStackBackup extends Resource {
  instance_security_groups: NestedSecurityGroup[];
  instance_internal_ips_set: InternalIP[];
}
