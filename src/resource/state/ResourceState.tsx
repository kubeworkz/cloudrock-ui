import { FunctionComponent } from 'react';

import { StateIndicator } from '@cloudrock/core/StateIndicator';
import { Resource } from '@cloudrock/resource/types';

import { getResourceState } from './utils';

interface ResourceStateProps {
  resource: Resource;
}

// TODO: remove extra check after resources list is migrated to ReactJS
export const ResourceState: FunctionComponent<ResourceStateProps> = (props) =>
  props.resource ? (
    <StateIndicator {...getResourceState(props.resource)} />
  ) : null;
